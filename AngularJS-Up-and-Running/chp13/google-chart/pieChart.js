angular.module('GoogleChart')
       .directive('pieChart', ['googleChartLoaderPromise', 
            function(googleChartDataLoaderPromise) {
                var convertToPieChartDataTableFormat = function(firstColumnName, secondColumnName, data) {
                    var pieChartArray = [[firstColumnName, secondColumnName]];
                    for (var i = 0; i < data.length; i++) {
                        pieChartArray.push([data[i].label, data[i].value]);
                    }

                    return google.visualization.arrayToDataTable(pieChartArray);
                };

                return {
                    restrict: 'A',
                    scope: {
                        chartData: '=',
                        chartConfig: '='
                    },
                    link: function($scope, $element) {
                        googleChartDataLoaderPromise.then(function() {
                             var chart = new google.visualization.PieChart($element[0]);
                             $scope.$watch('chartData', function(newVal, oldVal) {
                                 var config = $scope.chartConfig;
                                 if (newVal) {
                                     chart.draw(convertToPieChartDataTableFormat(config.firstColumnHeader, config.secondColumnHeader, newVal),
                                                    {title: $scope.chartConfig.title});
                                 }
                             }, true);
                        });
                    }
                };
            }]);

/**
 * $scope.$watch('chartData', func, bool) does a deep watch on $scope.ChartData and whenever it (or any element inside of it) changes it
 * call the function defined by func.
 * 
 * A regular $watch does only a shallow check, it is defined by ommiting the third argument(bool) or making it false.
 * 
 * A deep $watch recursively check each object and key inside the object or variable and use angular.equals to check for equality for all 
 * objects. Obviously, it catches all changes, but also consumes more CPU cycles. So be careful that you don’t abuse deep watches across your 
 * application. Instead, it’s preferable to have a Boolean that signals if something internally has changed and watch that.
 * 
 * Whenever uoy're working with third-party components, let AngularJS know when someth8ing outside it's life cycle changes 
 * by calling $scope.$apply() or $scope.$digest()
 */