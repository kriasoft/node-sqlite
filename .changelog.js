// This is an optional configuration file
// you can use with changelog-version.
// If specified, any command line args has priority over the
// values returned in this file.

// All values are optional.
// Do not use the ES6 export default
// since the file is imported using require()
// See command line options for additional available properties
module.exports = {
  changelogFile: () => {
    return 'CHANGELOG.md'
  },
  // ==== Options specific to prepare ====
  newUnreleasedText: `## UNRELEASED

**Contributor:** {{author.name}}

- {{{subject}}}{{{body}}}`,
  unreleasedTag: () => {
    return 'UNRELEASED'
  },
  unreleasedTagFormat: '{version} - {date}',
  requireUnreleasedEntry: true,
  requireUnreleasedEntryFailMsg: `You cannot commit until you've added the release notes to CHANGELOG.md
  
See CONTRIBUTING.md for instructions.`
}
