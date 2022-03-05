# My contact's API 📝

Project developed in NodeJs, using the express framework. In order to train basic concepts in backend, development of REST APIs, following RESTFUL standards.

## Technologies used

- [NodeJs](https://nodejs.org/en/docs/);
- [Express](https://expressjs.com/pt-br/);
- [Docker](https://docs.docker.com/get-started/);
- [Postgres](https://www.postgresql.org/docs/).

## What I'm Learning? 📚
- Design Pattern Singleton:
  - Design pattern Singleton defines that it is only possible to have a single object instance for each application class. For example, the ContactController class can have only one object of this class instantiated, never more. And whenever you use the class module elsewhere in the application, the same instance will always be used, since node generates a placeholder in memory for that instance.
###
- Controllers responsibilities:
  - Controllers are tools that we only use to define the application's business rules. The controller layer should not know, for example, what are the data source (JSON, SQL, NoSQL, in-memory array, etc) implementation rules. Since one of the problems of passing this responsibility to this layer is that when there is a need to change the data source, it will be necessary to refactor the entire controller, and it is where all the sensitive part of the application is, making the refactoring very critical. Knowing the business rules should be the sole responsibility of the control layer.
###
- Repository Pattern:
  - The repository pattern defines that there must be an abstraction layer to access the Data source. Therefore, the Controller gets to know the Repository, which in turn, the Repository will know which methods to access the data source. For example in an array, the repository will know that the push method adds an element to the array, find looks for an element, etc. This makes development easier, because the day it is necessary to change the Data Source, it will only be necessary to refactor the Repository, keeping the Controllers implementation intact.
  Controller <-> Repository <-> Data Source

<p align="center">Developed with 💜 by <strong>Christofer Assis</strong></p>
