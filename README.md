# weather4fr

<!-- badges: start -->

[![build status](https://gitlab.roqs.basf.net/G55W001/weather4fr/badges/development/pipeline.svg)](https://gitlab.roqs.basf.net/G55W001/weather4fr/pipelines?scope=branches)
[![coverage report](https://gitlab.roqs.basf.net/G55W001/weather4fr/badges/development/coverage.svg)](https://gitlab.roqs.basf.net/G55W001/weather4fr/pipelines)

<!-- badges: end -->

## Greetings from Happy Potter

Thanks for using h **app** y potter to create this App. :zap:

Take a look at your brand new app in the _App Store_ here:

-   [Development](https://app-dev.roqs.basf.net/weather4fr/)
-   [QA](https://app-qa.roqs.basf.net/weather4fr/)
-   [Production](https://app.roqs.basf.net/weather4fr/)

If you need more information on what the App Store provides to you, please
have a look at our [developer documentation](https://developer.docs.basf.net/appstore/).
In case you need general support on how to set up your machine to start programming,
please have a look at the [developer documentation](https://developer.docs.basf.net/) as well.

For pod information and logs of your App, try <a href="https://app.roqs.basf.net/portal/app/26892/logs" rel="noopener noreferrer" target="_blank"><img alt="Project Status Logs" aria-hidden="" class="project-badge" src="https://app.roqs.basf.net/appstore_portal_back_end/api/apps/26892/badges/logs"></a>

### Your current setup

-   **Docker**: We have already containerized your app. It's ready to be deployed anywhere. You can have a look at the `Dockerfile`(s) in the different subfolders of your project for details on how this is done.
-   **Kubernetes**: Your docker containers are aggregated into a pod and deployed together with a service connecting it to our API gateway. Optionally, you might also have a persistent volume claim for permanent storage. For more information on the configuration, have a look at the [`.appstore/deployment.yml`](https://gitlab.roqs.basf.net/G55W001/weather4fr/-/blob/development/.appstore/deployment.yml).
-   **CI/CD**: Remember the days you scratched your head on how and when to deploy? Those days are over! We already made sure your app gets automatically build and deployed the moment you make a change! Checkout the pipelines [here](https://gitlab.roqs.basf.net/G55W001/weather4fr/pipelines?scope=branches)
    and configure them via the [`.gitlab-ci.yml`](https://gitlab.roqs.basf.net/G55W001/weather4fr/-/blob/development/.gitlab-ci.yml) file.

#### GitLab Templates

We provide you with a set of [GitLab templates](https://docs.gitlab.com/ce/user/project/description_templates.html#overview) for creating pre-structured issues. They are located in the `.gitlab` folder of your repo.

This will start your API in **development mode**. In contrast, the live version runs in production mode.

### SwaggerUI

When using the [SwaggerUI](https://developer.docs.basf.net/api/beginners/#what-are-openapi-and-swagger) please mind the possibility to choose the environment against which your backend calls are executed!

### dotenv

The dotenv package is used to load environment variables from a .env file into process.env. This is useful for storing things like API keys while developing locally. The .env file is not committed to source control.

### Dependencies

Have a look at the [package.json](package.json) to see which dependencies are used.

### Ports

The default port is 5000, it could be that this port is already taken by for example "Global protect". In that case just update the index.js to some other port.

expl.

```
// Start server on port 5001 as 5000 is already taken
const port = 5001;
app.listen(port, () =>
  console.log(`App listening on port ${port} in ${mode} mode`)
);
```

_**Note:** these variables will be available in your running containers without the `K8S_ALL_` prefix (see: the [secret section on our developer documentation](https://developer.docs.basf.net/appstore/secrets/#app-store-secret-integration))\_
