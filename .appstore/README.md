# App Store configuration

**_If you have to ask, you'll never know. If you know, you need only ask_**

This is where we are hiding some of the magic behind-the-curtains stuff that is needed to configure and deploy your newly created app. Glad you found it.

:warning: You break it, you fix it.

There are four files in here:

* `README.md`: The file you are reading right now. Leave it as-is, that allows us to easily update and extend the information we provide via this file.

* `deployment.yml`: Your docker containers are aggregated into a pod and deployed together with automatically generated service connecting it to our API gateway. Optionally, you might also have a persistent volume claim for permanent storage. For more information on the configuration, have a look at the [`.appstore/deployment.yml`](.appstore/deployment.yml).

* `egress.yml`: A list of public and private addresses to be able to connect to external services that would otherwise be blocked by firewalls or blacklisted.
  Example `egress.yml` content:

   ```yml
   # Public resources, Cloud resources
   public:
   - host: google.com
     port: 443
   - host: azure.con
     port: 1433
   # BASF intranet comments
   private:
   - host: 10.99.195.24/0
     port: 42
   - host: http
     port: 8080
   ```

* `portal.md`: A friendly welcome description of your application that will show up in the details page of your app in the App Store Portal. Change the content of this file to provide helpful information for users in the App Store Portal.



