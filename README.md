# For Developers

Built with [11ty](https://www.11ty.dev/).

The site is built in `/src`, and built to `/public`.

- Use `npm run serve` to serve the site.
  - This command **does not** clean up the `/public` directory.
- Use `npm run build` to build the site to `/public`.
  - This command **does** clean up the `/public` directory.
- Deployment is automatically done, when pushing to GitHub using GitHub actions.
  - **Warning**: The Repository is public!

# Tutorial for 11ty: (My unpublished Blogpost)

Since I'm thinking about becoming TA, I want to build myself a nice website. (If
I'm being honest, I was just searching for an excuse to invest my time into 
another one of these projects.) So I've been looking at websites of the
[polyring](https://polyring.ch/) to look for some inspiration. I came across
[Danny's website](https://n.ethz.ch/~dcamenisch/), which I really liked. Luckily 
enough, he also wrote a blog about setting up his website. Now guess what I did?
Correct! I read it, loved it, and replicated it.

So here I am, setting up a website with [11ty](https://www.11ty.dev/). The cool
thing about 11ty is, that you can use just about any templating language. Since
I don't really know my way with templating languages, I'm probably going to
stick with MarkDown. By now (yes, I'm writing this **while** setting up the
site) I can write blogposts in pure MarkDown (with some frontmatter) and
"compile" them into nice pages. 

So let me just give you a quick idea, of how you can set up such a site aswell.
(This definitely isn't a tutorial for me, should I ever forget what I did here)
So let's start with some prerequisites. You obviously should know how to write
MarkDown (which is really easy). Furthermore knowing some HTML and CSS is also
good, if you want to get your page looking *nice*. But really, nowadays you can
just ask CHAT-GPT, or even better GitHub Copilot to write the CSS for you. You 
also need an npm installation on your system. Create a folder for your project.
First we have to initialize our project with npm, and install 11ty:

```bash
mkdir projectName
cd projectName
npm init -y
npm install @11ty/eleventy --save-dev
```

Congratulations! You set up your project. Now let's make a simple "Hello
World". So create a `index.md` file in the root directory and write `Hello
World` into it. To build the site, run the following command:

```bash
npx @11ty/eleventy
```

11ty also has a "serve" function, with which we can make it watch the files,
autoupdate the site, and also host a live server. To use the serve function, use
the following command:

```bash
npx @11ty/eleventy --serve
```

By default, 11ty reads the files from the root directory, and writes the output
to `_site`. We can change this using a config file. That file is called
`.eleventy.js`. A simple configuration would be the following:

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addWatchTarget('src/css');
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
```

This configuration reads files from `src` and writes the built page to `public`.
Furthermore, it includes `src/css`, so we can use CSS stylesheets. But so far
we just have a boring markdown file, which is being built to HTML. Let's do
something a little more fancier. Let's use some HTML and CSS.

We create a folder structure such as the following:

```txt
projectName/
├─ src/
│   ├─ _includes/
│   │   ├─ layouts/
│   │   │   ├─ boilerplate.html
│   │   ├─ snippets/
│   │   │   ├─ footer.html
│   ├─ css/
│   │   ├─ main.css
│   ├─ index.md
├─ .eleventy.js
├─ package.json
```

In `boilerplate.html`, we can now write down a basic template with some of the
required html boilerplate. You could, for example, use something like the
following:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/main.css"> 
    <title>{{ "{{" | escape }} title {{ "}}" | escape }}</title>
  </head>
  <body>
    {{ "{{" | escape }} content {{ "}}" | escape }}
    {{ "{%" | escape }} include "snippets/footer.html" {{ "%}" | escape }}
  </body>
</html>
```

Using this template, we can now write our `index.md`, specifying a title and a
layout:

```txt
---
title: "Blogs"
layout: layouts/boilerplate.html
---
Hello World!
```

And some basic styling in `/css/main.css`.

We can also define a basic footer in '/snippets/footer.html', which will appear
in all files using the `boilerplate.html` layout. 

If you want, you can also add a layout, which uses the boilerplate layout.
Meaning, a layout can use a layout. For example, you can create a layout
`blogpost.md`.

To make building a bit easier, you can set custom build commands in
`package.json`. I use the following:

```json
"scripts": {
  "build": "rm -r public && npx @11ty/eleventy",
  "serve": "npx @11ty/eleventy --serve"
}
```

Now you can run them using `npm run build` or `npm run serve`. I run
`rm -r public` in the build command to delete deleted files on the page.

I hope this was a good first introduction to 11ty. If you have more questions,
just ask google. I probably don't know either...

