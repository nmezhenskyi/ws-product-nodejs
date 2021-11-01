# Work Sample for Product Aspect, Node.js Variant

[What is this for?](https://github.com/EQWorks/work-samples#what-is-this)

### Demo

- [Client]()  
- [API](https://frightful-fangs-21306.herokuapp.com)  

### Problems

#### 1. API rate-limiting

Implement per-client rate-limiting on all of the API endpoints. Do not use an off-the-shelf solution such as [Flask-Limiter](https://pypi.org/project/Flask-Limiter/) or [express-rate-limit](https://www.npmjs.com/package/express-rate-limit).

The implementation should work well in a [_serverless_](https://en.wikipedia.org/wiki/Serverless_computing) context where the API server only goes online for HTTP requests, then goes offline when idle.

#### 2. Client-side general chart visualizations

Implement one or more types of charts to visualize data supplied from the API endpoints effectively. Users should be able to pick different metrics to visualize and compare with others.

#### 3. Client-side data table

Implement a functional data table for users to browse through data supplied from the API endpoints. The data table should allow users to fuzzy search on meaningful values (such as POI names), and the table would highlight the matching items in a user-friendly way.

#### 4. Client-side geo visualizations

Implement a functional map-based data visualization based on different POI-bound metrics. Users should be able to select metrics and distinguish each metrics' intensity of POIs. The map should also allow a certain degree of flexibility for users to zoom in and out and see a "clustered" indicator when more than one POIs are too close to each other at the given zoom level.

You will likely need to implement data join between the POIs and other datasets.
