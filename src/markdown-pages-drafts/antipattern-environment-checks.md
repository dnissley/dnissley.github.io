---
path: "/writing/antipattern-environment-checks"
date: "2020-06-24"
title: "Antipattern: Environment Checks"
---

"Environment checking" -- code that uses knowledge about what environment it's running in to make decisions -- is a pattern that I run across a lot in code written by teams without a strong devops culture. They're often introduced when relying on some third party service that only functions in production. An example might be something like Twilio, where you only want real text messages to be sent in production, so you write some code that looks like this:

```javascript
if (process.env.NODE_ENV === "production") {
  twilio.sendTextMessage(...);
} else {
  console.log("not sending text messages outside production");
}
```

The first time you encounter a dependency like this, an environment check seems totally necessary, or even natural. So you don't even think about investigating alternative solutions. And to be fair, in a small enough project with only one or two such checks, the dark side of this pattern might not rear it's ugly head. So what is the problem with writing code like this?

## Problem 1: It makes development painful

Just because a particular dependency should only be enabled in production doesn't mean that development involving that dependency only occurs in production. Even beyond the first time you develop a feature around a check like this, you still need to come back and maintain or even just test that functionality. That means at some point, some developer is going to need to flip that feature on locally.

At this point, a developer has two options -- they could flip the app to run in production mode, or they could temporarily modify only the check around the code they are trying to modify. The problem with the first approach (running in production mode locally) is that it also might turn on a lot of other things that they don't want to be turning on locally, that have nothing to do with the change they are making. For example, consider an application with environment checks around Twilio and Paypal:

```javascript
// File A:
if (process.env.NODE_ENV === "production") {
  twilio.sendTextMessage(...);
} else {
  console.log("not sending text messages outside production");
}

// File B:
if (process.env.NODE_ENV === "production") {
  paypal.performTransaction(...);
} else {
  console.log("not performing paypal transactions outside production");
}
```

Now we might inadvertently be performing Paypal transactions when we set `NODE_ENV=production`. That's unlikely of course, since Paypal would probably require additional configuration which probably wouldn't exist on a developer's machine. But this could still cause issues. Consider what would happen if another function first called the Paypal code, and then called the Twilio code. Without the proper configuration, the Paypal transaction would likely fail, throwing some error, which would need to be worked around in order to test the Twilio code getting called afterwards.

The problem with the second approach (temporarily modifying a check) is that there easily could be multiple places in the code where a check is made for a given feature and that they will need to modify and keep track of (and make sure they don't check in to version control!). This can be solved with indirection, but in my experience, lack of indirection is often comorbid with lots of environment checks.

## Problem 2: It encourages "special" environments

TODO
