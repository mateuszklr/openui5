package com.sap.ui5.tools.infra.git2p4;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

public class Git2P4Main {

	static GitClient git = new GitClient();
	static P4Client p4 = new P4Client();
	static Git2P4 git2p4 = new Git2P4(git, p4);
	static String p4depotPath = null;
	static String p4change = null;
	static String range = null;
	static String resumeAfter = null;
	static boolean noFetch = false;
	
	static SortedSet<GitClient.Commit> allCommits = new TreeSet<GitClient.Commit>(new Comparator<GitClient.Commit>() {
		public int compare(GitClient.Commit a, GitClient.Commit b) {
			int r = a.getCommitDate().compareTo(b.getCommitDate());
			if ( r != 0 ) 
				return r;
			return a.getId().compareTo(b.getId());
		}
	});
	
	static void collect(Mapping repo, String range) throws IOException {
		git.repository = repo.gitRepository;
		if ( !git.repository.isDirectory() || !(new File(git.repository, ".git").isDirectory()) && repo.giturl != null ) {
			git.repository.mkdirs();
			git.clone(repo.giturl); 
		}
		if ( !noFetch ) {
		  git.fetch();
		}
		git.log(range);
		List<GitClient.Commit> commits = new CommitHistoryOptimizer(git.lastCommits).run();
		for(GitClient.Commit commit : commits) {
			commit.data = repo;
		}
		allCommits.addAll(commits);
	}

	static class Mapping {
		String giturl;
		File gitRepository;
		String p4path;
		String targetIncludes;
		String targetExcludes;
		
		Mapping(String giturl, File gitRepository, String p4path, String includes, String excludes) {
			this.giturl = giturl;
			this.gitRepository = gitRepository;  
			this.p4path = p4path;
			this.targetIncludes = includes; 
			this.targetExcludes = excludes; 
		}
	}
	
	private static List<Mapping> mappings = new ArrayList<Mapping>();

	private static void createUI5Mappings(File repositoryRoot, String p4depotPrefix) {
		mappings.clear();
		mappings.add(new Mapping(
				"git.wdf.sap.corp:29418/sapui5/sapui5.runtime.git",
				new File(repositoryRoot, "sapui5.runtime"), 
				p4depotPrefix,
				"pom.xml,src/,test/",
				"src/dist/_osgi/,src/dist/_osgi_tools/,src/platforms/,test/_selenium_tests_lsf/"
		));
		mappings.add(new Mapping(
				"git.wdf.sap.corp:29418/sapui5/sapui5.platforms.gwt.git",
				new File(repositoryRoot, "sapui5.platforms.gwt"),
				p4depotPrefix + "/src/platforms/gwt",
				null,
				null
		));
		/*
		mappings.add(new Mapping(
				new File(repositoryRoot, "sapui5.platforms.qtp-addin"),
				p4depotPrefix + "/src/platforms/qtp-addin",
				null,
				null
		));
		*/ 
		mappings.add(new Mapping(
				"git.wdf.sap.corp:29418/sapui5/sapui5.osgi.runtime.git",
				new File(repositoryRoot, "sapui5.osgi.runtime"),
				p4depotPrefix + "/src/dist/_osgi",
				null,
				null
		));
		mappings.add(new Mapping(
				"git.wdf.sap.corp:29418/sapui5/sapui5.osgi.tools.git",
				new File(repositoryRoot, "sapui5.osgi.tools"),
				p4depotPrefix + "/src/dist/_osgi_tools",
				null,
				null
		));
	}
	
	private static void usage(String errormsg) {
		if ( errormsg != null ) {
			System.out.println("**** error: " + errormsg);
			System.out.println();
		}
		System.out.println("Transports a range of commits from a set of Git repositories to a Perforce depot.");
		System.out.println();
		System.out.println("Usage: Git2P4main [options | -template <file> ] <commit-range>");
		System.out.println();
		System.out.println("Perforce options:");
		System.out.println(" -p, --p4-port          Perforce Host and Port (e.g. perforce1666:1666)");
		System.out.println(" -u, --p4-user          Perforce User (e.g. claus)");
		System.out.println(" -P, --p4-password      Perforce Password (e.g. *****)");
		System.out.println(" -C, --p4-client        Perforce Client Workspace (e.g. MYLAPTOP0815)");
		System.out.println(" -d, --p4-dest-path     root path in Perforce depot (e.g. //depot/project/dev)");
		System.out.println(" -c, --p4-change        an existing (pending) Perforce change list to be used for the first transport");
		System.out.println();
		System.out.println("Git/Mapping options:");
		System.out.println(" --git-user             SSH id used for clone operations");
		System.out.println(" --git-no-fetch         suppress fetch operations (use local repository only)");
		System.out.println(" --git-dir              Git repository root");
		System.out.println(" --ui5-git-root         Git repository root for multiple (hardcoded) UI5 repositories");
		System.out.println(" --includes             List of paths, relative to root, to be included from transport");
		System.out.println(" --excludes             List of paths, relative to root, to be excluded from transport");
		System.out.println(" -ra, --resume-after    Commit after which to resume the transport (must be a full SHA1)");
		System.out.println(" -opt, --optimize-diffs Remove 'scatter' in diffs (e.g. whitespace changes or RCS keyword expansion)");
		System.out.println(" -i, --interactive      ask user after each change has been prepared, but before it is submitted");
		System.out.println(" -s, --submit           ask user after each change has been prepared, but before it is submitted");
		System.out.println();
		System.out.println("General options:");
		System.out.println(" -h, --help             shows this help text");
		System.out.println(" -v, --verbose          be more verbose");
		System.out.println(" -l, --log-file         file path to write the log to");
		System.out.println();
		
		if ( errormsg != null ) {
			throw new RuntimeException(errormsg);
		}
	}
	public static void main(String[] args) throws IOException {
		String template = null;
		String mode = "submit";
		
		for(int i=0; i<args.length; i++) {
			if ( "-h".equals(args[i]) || "--help".equals(args[i]) ) {
				usage(null);
				return;
			} else if ( "-v".equals(args[i]) || "--verbose".equals(args[i]) ) {
				p4.verbose = true;
				git.verbose = true;
			} else if ( "-l".equals(args[i]) || "--log-file".equals(args[i]) ) {
				Log.setLogFile(new File(args[++i]), false);
			} else if ( "-lt".equals(args[i]) || "--log-file-template".equals(args[i]) ) {
				template = args[++i];
			} else if ( "-p".equals(args[i]) || "--p4-port".equals(args[i]) ) {
				p4.port = args[++i];
			} else if ( "-u".equals(args[i]) || "--p4-user".equals(args[i]) ) {
				p4.user = args[++i];
			} else if ( "-P".equals(args[i]) || "--p4-password".equals(args[i]) ) {
				p4.passwd = args[i];
			} else if ( "-C".equals(args[i]) || "--p4-client".equals(args[i]) ) {
				p4.client = args[++i];
			} else if ( "-c".equals(args[i]) || "--p4-change".equals(args[i]) ) {
				p4change = args[++i];
			} else if ( "-d".equals(args[i]) || "--p4-dest-path".equals(args[i])) {
				p4depotPath = args[++i];
			} else if ( "--git-user".equals(args[i]) ) {
				git.sshuser = args[++i];
			} else if ( "--git-no-fetch".equals(args[i]) ) {
				noFetch = true;
			} else if ( "--ui5-git-root".equals(args[i]) ) {
				if ( p4depotPath == null ) {
					throw new RuntimeException("p4depot path must be specifed before a UI5 repository root");  
				}
				createUI5Mappings(new File(args[++i]), p4depotPath);
			} else if ( "--git-dir".equals(args[i]) ) {
				if ( p4depotPath == null ) {
					throw new RuntimeException("p4depot path must be specifed before a git repository root");  
				}
				mappings.clear();
				mappings.add(new Mapping(null, new File(args[++i]), p4depotPath, null, null));
			} else if ( "--includes".equals(args[i]) ) {
				if ( mappings.size() != 1 ) {
					throw new RuntimeException("includes can only be specified for an (already defined) single src root");  
				}
				mappings.get(0).targetIncludes = args[++i];
			} else if ( "--excludes".equals(args[i]) ) {
				if ( mappings.size() != 1 ) {
					throw new RuntimeException("excludes can only be specified for an (already defined) single src root");  
				}
				mappings.get(0).targetExcludes = args[++i];
			} else if ( "-ra".equals(args[i]) || "--resume-after".equals(args[i]) ) {
				resumeAfter = args[++i];
			} else if ( "-opt".equals(args[i]) || "--optimize-diffs".equals(args[i]) ) {
				git2p4.opt = true;
			} else if ( "-i".equals(args[i]) || "--interactive".equals(args[i]) ) {
				git2p4.interactive = true;
			} else if ( "-s".equals(args[i]) || "--submit".equals(args[i]) ) {
				git2p4.submit = true;
			} else if ( "--split-logs".equals(args[i]) ) {
				mode = "splitLogs";
			} else if ( "--list".equals(args[i]) ) {
				mode = "list";
			} else if ( args[i].startsWith("-") ) {
				throw new RuntimeException("unsupported option " + args[i]);
			} else {
				range = args[i];
			}
		}

		if ( range == null ) {
			throw new RuntimeException("Commit range must be provided");
		}
		
		Log.println("args = " + Arrays.toString(args));
		Log.println("");

		// collect commits across repositories
		for(Mapping repoMapping : mappings) {
			collect(repoMapping, range);
		}
		for(GitClient.Commit commit : allCommits) {
			Log.println(commit.repository + " " + commit.getId() + " " + commit.getCommitDate()+ " " + commit.getSummary());
		}

		if ( "list".equals(mode) ) {
			return;
		}
		if ( "splitLogs".equals(mode) ) {
			SplitLogs.run(template, allCommits);
			return;
		}

		for(GitClient.Commit commit : allCommits) {
			Log.println(commit.repository + " " + commit.getId() + " " + commit.getCommitDate());
			if ( resumeAfter != null ) {
				if ( resumeAfter.equals(commit.getId()) ) {
					resumeAfter = null;
				}
				Log.println("skip");
				continue;
			}
			if ( template != null ) {
				String filename = template.replace("#", commit.getId());
				Log.setLogFile(new File(filename), true);
			}
			p4change = git2p4.run(commit, p4change);
			if ( template != null ) {
				Log.restorePrevious();
			}
		}
		
	}
	
}
