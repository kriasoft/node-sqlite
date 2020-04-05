# Contributing

- Make sure you have appropriate unit tests that cover your feature
- Make sure coverage % is maintained

# Changelog

If a git commit message looks like this:

```text
This is my commit subject

This is my commit body
```

Then the changelog will be stamped in the following fashion on merge:

```text
## <version> - <date>

**Contributor:** <author>

- <git subject>

<git body>
```

# Merging

Once merged, the CI will auto-publish to npm and the changelog will be updated.
