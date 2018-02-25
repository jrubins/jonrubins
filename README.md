# Jon Rubins

## Table of Contents

* [Running the project](#running-the-project)
* [Deploying the project](#deploying-the-project)

## Running the project

### Installing dependencies

This project depends on Node.js and Yarn, so we'll need to get those set up. You can do this however you'd like, as long as you're using the exact versions that we expect. You can find these exact versions in `./package.json` in the `engines` key of the JSON file.

**Installing Node.js**

It is recommended to use [NVM](https://github.com/creationix/nvm) for installing Node.js. NVM is a Node.js version manager and allows you to easily install, switch between and uninstall different Node versions. Follow the instructions on their repository for getting NVM installed. You can verify the installation succeeded as expected by running the following commands:

```
$ node -v
vX.X.X     // <= The X.X.X version should match the version of Node.js specified in the package.json file.
$ npm -v
X.X.X      // <= The X.X.X version should match the version of npm specified in the package.json file.
```

**Installing Yarn**

[Yarn](https://yarnpkg.com/) is a much faster dependency manager than NPM created by Facebook.

**We don't recommend installing Yarn via Homebrew as it will also install Node.js if you don't yet have it and you may run into conflicts with what we install via NVM.**

Install Yarn using the following command:

```
$ npm -g install yarn@X.X.X      // <= The X.X.X version should match the version of yarn in the package.json file.
```

To verify the Yarn installation worked as expected, run the following commands:

```
$ which yarn
/Users/{yourUser}/.nvm/versions/node/vX.X.X/bin/yarn
$ yarn -v
X.X.X          // <= The X.X.X version should match the version of yarn in the package.json file.
```

### Running

After you've installed the dependencies, you can now start the frontend development server. We use `webpack-dev-server`. Once you've run the project, you can connect to the development server at [http://localhost:9036](http://localhost:9036).

To **run** the project, run the following command:

```
$ yarn start
```

## Deploying the project

We use Netlify to host the site. It has a ton of awesome features like prerendering for SEO, free SSL provisioning, free custom domains, Git hooks and more. In order to deploy, you just have to commit to master (or merge a PR into master); Netlify will automatically kick off a build and a deploy.

Check out the `./_redirects` file to see configured redirects for Netlify. This allows our SPA to run properly by serving our `index.html` file for all requests.

The `./netlify.toml` file has the configured build command as well as the production environment variables values.
