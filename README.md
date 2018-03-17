# Sequencer Thing

This is a demo sequencer written in JavaScript, for making demoscene-type things.

Heavily inspired by @mrdoob's [frame.js](https://github.com/mrdoob/frame.js/), I wanted to try my own take using a slightly more functional style. It's also built using a bundler, with the end result being distributable compiled code (instead of an approach like using `eval()`, which makes sense if you're also building a nifty in-browser editor ;)). There's also some assumptions about how it might be used. For example, time playback expects a single audio track to sync with.

I've tried to mitigate some of the more side-effectual or persistent state, though more improvements can certainly be made. I want to try and minimise mutation as much as possible, tricky given the nature of the project.

There isn't much documentation yet, and the interfaces and structures are highly likely to change as I learn and make decisions about what to do.

Feel free to poke around though.
