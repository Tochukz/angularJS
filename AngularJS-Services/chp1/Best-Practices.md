### Best Practices
Each component should have a specific purpoose.  
##### Controller  
* Controllrs should be as thin as ppossible code-wise.  
* By limiting the controller to just those methods needed to interact with the model and the user's interactions, you reduce its complexity and make the controller easier to maintain.  
* It is sometimes better to move repeated code for common functionality that handles events to a base controller instead of a service.  
##### Directives  
* Directrive are responsible for manipulating DOM and extend HTML.  
* Use directives to validated your form inputs.
##### Services  
* You can also use a service as a great way to communicate among components.  
* Services should also be used to integrate with external services that you use in your application.  