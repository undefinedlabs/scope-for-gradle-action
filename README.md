![logo](scope_logo.svg)

# Scope for Gradle Action

GitHub Action to run your tests automatically instrumented with the [Scope Java agent](http://home.undefinedlabs.com/goto/java-agent).

## About Scope

[Scope](https://scope.dev) gives developers production-level visibility on every test for every app – spanning mobile, monoliths, and microservices.

## Usage

1. Set Scope DSN inside Settings > Secrets as `SCOPE_DSN`.
2. Add a step to your GitHub Actions workflow YAML that uses this action:

```yml
steps:
  - uses: actions/checkout@master
  - name: Set up JDK 1.8
    uses: actions/setup-java@v1
    with:
      java-version: 1.8 
  - name: Scope for Gradle Action
    uses: undefinedlabs/scope-for-gradle-action@v1
    with:
      dsn: ${{secrets.SCOPE_DSN}} # required
      run-tests: true # optional - default is 'true'
      command: ./gradlew test # optional - default is './gradlew test'
```

If you want to execute the test command manually, it is needed to add the `--init-script initscope.gradle` option to the run step.

```yml
steps:
  - uses: actions/checkout@master
  - name: Set up JDK 1.8
    uses: actions/setup-java@v1
    with:
      java-version: 1.8 
  - name: Scope for Gradle Action
    uses: undefinedlabs/scope-for-gradle-action@v1
    with:
      dsn: ${{secrets.SCOPE_DSN}} # required
      run-tests: false # optional - default is 'true'
  - name: Gradle Build
    run: ./gradlew build --init-script initscope.gradle
```