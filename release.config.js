const { execSync } = require('node:child_process');

function getRepositoryUrl() {
  try {
    const url = execSync('git config --get remote.origin.url', {
      encoding: 'utf8',
    }).trim();
    if (url)
      return url
        .replace(/^git@github\.com:/, 'https://github.com/')
        .replace(/\.git$/, '');
  } catch {
    // sem remote ou fora de repo git
  }
  return undefined;
}

module.exports = {
  branches: ['main'],
  repositoryUrl: getRepositoryUrl(),
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
};
