angular.module('Angello.Storyboard').controller('StoryboardCtrl', function(STORY_TYPES){ //Depedency injection
    var storyboard = this;
    
    storyboard.types = STORY_TYPES;

    storyboard.currentStory = null;
    storyboard.editedStory = {};

    storyboard.setCurrentStory = function(story){
        storyboard.currentStory = story;
        storyboard.editedStory = angular.copy(storyboard.currentStory);
    };

    // storyboard.stories = [
        
    //     {
    //         assignee: '1',
    //         criteria: 'It tests!',
    //         description: 'This is a test',
    //         id: '1',
    //         reporter: '2',
    //         status: 'To Do',
    //         title: 'First Story',
    //         type: 'Spike'
    //     },
    //     {
    //         assignee: '2',
    //         criteria: 'It works!',
    //         description: 'testing something',
    //         id: '2',
    //         reporter: '1',
    //         status: 'In Progress',
    //         title: 'Second Story',
    //         type: 'Enhancement'
    //     }
    
    // ];

    storyboard.statuses = [
        {name: 'To Do'},
        {name: 'In Progress'},
        {name: 'Code Review'},
        {name: 'QA Review'},
        {name: 'Verified'}
    ];

    storyboard.updateStory = function(){
        var fields = ['title', 'description', 'criteria', 'status', 'type', 'reporter', 'assignee'];
        fields.forEach(function(field){
            storyboard.currentStory[field] = storyboard.editedStory[field];
        });
        StoriesModel.update(storyboard.currentStory.id, storyboard.editedStory)
                    .then(
                        function(result){
                            storyboard.getStories();
                            storyboard.resetForm();
                            $log.debug('RESULT', result);
                        },
                        function(reason){
                            $log.debug('REASON', reason);
                        }
                    );
        storyboard.resetForm();
    };

    storyboard.updateCancel = function(){
        storyboard.resetForm();
    };

    function ID(){
        return '_' + Math.randon().toString(36).substr(2, 9);
    }

    storyboard.createStory = function(){
        var newStory = angular.copy(storyboard.editedStory);
        newStory.id = ID();
        storyboard.stories.push(newStory);
        storyboard.resetForm();
    };

    storyboard.resetForm = function(){
        storyboard.currentStory = null;
        storyboard.editedStory = {};

        storyboard.detailsForm.$setPrestine();
        storyboard.detailsForm.$setUntouched();
    };

    storyboard.deleteStory = function(storyID){
        storyboard.stories.remove(function(story){
            return story.id === storyID;
        });  
        storyboard.resetForm();
    };

    storyboard.getStories = function(){ 
        StoryModel.all()
                   .then(
                        function(result){
                            storyboard.stories = (results !== 'null')? result.data : {}     
                            $log.debug('RESULT', result);
                        }, function(reason){
                            $log.dubug('REASON', reason);
                        }
                    );
    };
});