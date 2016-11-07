"use strict";!function(){angular.module("genie",["ui.router","ngMaterial"])}(),function(){function appReady($state){$state.go("app.home")}appReady.$inject=["$state"],angular.module("genie").run(appReady)}(),function(){function routes($stateProvider){$stateProvider.state("app",{url:"/app",abstract:!0,views:{content:{template:"<ui-view></ui-view>"}}})}routes.$inject=["$stateProvider"],angular.module("genie").config(routes)}(),function(){function HomeController($mdDialog,ResultFactory){function showResults($fileContent){home.resultFactory=new ResultFactory($fileContent),showResultsBar(home.resultFactory.test())}function showResultsBar(data){$mdDialog.show({templateUrl:"/assets/templates/results/results.html",controller:"ResultsController as results",clickOutsideToClose:!0,locals:{Results:data}})}var home=this;return home.showResults=showResults,home}HomeController.$inject=["$mdDialog","ResultFactory"],angular.module("genie").controller("HomeController",HomeController)}(),function(){function HomeRoute($stateProvider){$stateProvider.state("app.home",{url:"/home",abstract:!1,templateUrl:"/assets/templates/home/home.html",controller:"HomeController as home"})}HomeRoute.$inject=["$stateProvider"],angular.module("genie").config(HomeRoute)}(),function(){function NodeFactory(){var Node=function(name){this.name="",this.routes=new Map,name&&(this.name=name)};return Node.prototype.set=function(route){if(route&&route.destination&&route.weight){var destinationName=route.destination.name;this.routes.set(destinationName,route)}},Node.prototype.get=function(destination){if(destination&&destination.name)return this.routes.get(destination.name)},Node.prototype.del=function(destination){destination&&destination.name&&this.routes.delete(destination.name)},Node}angular.module("genie").factory("NodeFactory",NodeFactory)}(),function(){function OperationsFactory(){function parseRoutes(data){if(data){data=data.toUpperCase().replace(/\s+/g,"");for(var found=data.split(","),i=found.length-1;i>=0;i--){var valid=found[i].match(/^[A-Z]{1}[A-Z]{1}[0-9]+$/);null===valid&&i>-1&&found.splice(i,1)}return found}}function tokenizeNodes(path){if(path){path=path.toUpperCase().replace(/\s+/g,"");for(var found=path.split("-"),i=found.length-1;i>=0;i--){var valid=found[i].match(/^[A-Z]{1}$/);null===valid&&i>1&&found.splice(i,1)}return found}}return{parseRoutes:parseRoutes,tokenizeNodes:tokenizeNodes}}angular.module("genie").factory("OperationsFactory",OperationsFactory)}(),function(){function ProcessGraphsFactory(OperationsFactory,NodeFactory,RouteFactory){var Graph=function Graph(nodes){this.nodes=new Map,nodes&&(this.nodes=Graph.makeNodes(nodes))};return Graph.prototype.getAllPaths=function(source,destination,stops){var _this=this;source=source.toUpperCase(),destination=destination.toUpperCase();var allPaths=new Map;if(source&&destination&&stops&&this.nodes.get(source)&&this.nodes.get(destination)){var path,pathIndex,count;!function(){var traverse=function traverse(s,d,path,count){if(path.push(s),count--,s.name===d.name&&count<=stops-1||count<=0){if(s.name===d.name&&path.length>1){for(var pathStr="",weight=0,i=0;i<path.length;i++)pathStr+=path[i].name,i!==path.length-1&&(weight+=path[i].routes.get(path[i+1].name).weight);allPaths.set(pathStr,weight)}if(d.name===s.name&&count>0){var _iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=s.routes.keys()[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var node=_step.value;traverse(s.routes.get(node).destination,d,path,count)}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{!_iteratorNormalCompletion&&_iterator.return&&_iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}}}else{var _iteratorNormalCompletion2=!0,_didIteratorError2=!1,_iteratorError2=void 0;try{for(var _step2,_iterator2=s.routes.keys()[Symbol.iterator]();!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=!0){var node=_step2.value;traverse(s.routes.get(node).destination,d,path,count)}}catch(err){_didIteratorError2=!0,_iteratorError2=err}finally{try{!_iteratorNormalCompletion2&&_iterator2.return&&_iterator2.return()}finally{if(_didIteratorError2)throw _iteratorError2}}}path.pop()};path=new Array,pathIndex=0,count=++stops,traverse(_this.nodes.get(source),_this.nodes.get(destination),path,count)}()}return allPaths},Graph.prototype.calcDistance=function(path){var noRouteError="NO SUCH ROUTE";if(path&&path.match(/^(?:[A-Z]-+)+[A-Z]{1}$/)){path=path.toUpperCase();var tokens=path.split("-"),validNodes=new Array;for(var t in tokens){var nodeName=tokens[t];if(!this.nodes.get(nodeName))return noRouteError;validNodes.push(this.nodes.get(nodeName))}for(var distance=0,i=0;i<=validNodes.length;i++){var next=i+1;if(next<=validNodes.length-1){if(!validNodes[i].routes.get(validNodes[next].name))return noRouteError;distance+=validNodes[i].routes.get(validNodes[next].name).weight}}return distance}},Graph.makeNodes=function(data){if(data)var strNodes=OperationsFactory.parseRoutes(data);var nodes=new Map,_iteratorNormalCompletion3=!0,_didIteratorError3=!1,_iteratorError3=void 0;try{for(var _step3,_iterator3=strNodes[Symbol.iterator]();!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=!0){var nodeA,nodeB,r=_step3.value,nameOfNodeA=r[0],nameOfNodeB=r[1],weight=parseInt(r[2]);nodeA=nodes.has(nameOfNodeA)?nodes.get(nameOfNodeA):new NodeFactory(nameOfNodeA),nodeB=nodes.has(nameOfNodeB)?nodes.get(nameOfNodeB):new NodeFactory(nameOfNodeB);var routeToB=new RouteFactory(nodeB,weight);nodeA.set(routeToB),nodes.set(nodeA.name,nodeA),nodes.set(nodeB.name,nodeB)}}catch(err){_didIteratorError3=!0,_iteratorError3=err}finally{try{!_iteratorNormalCompletion3&&_iterator3.return&&_iterator3.return()}finally{if(_didIteratorError3)throw _iteratorError3}}return nodes},Graph}ProcessGraphsFactory.$inject=["OperationsFactory","NodeFactory","RouteFactory"],angular.module("genie").factory("ProcessGraphsFactory",ProcessGraphsFactory)}(),function(){function ResultFactory(OperationsFactory,ProcessGraphsFactory){var Result=function Result(input){this.graph={},input&&(this.graph=Result.processGraphs(input))};return Result.prototype.test=function(){var results=[];return this.graph&&this.graph.nodes&&results.push({test:1,result:this.calcDistance("A-B-C")},{test:2,result:this.calcDistance("A-D")},{test:3,result:this.calcDistance("A-D-C")},{test:4,result:this.calcDistance("A-E-B-C-D")},{test:5,result:this.calcDistance("A-E-D")},{test:6,result:this.calcNumberOfPossibleRoutesWithStops("C-C","<=","3")},{test:7,result:this.calcNumberOfPossibleRoutesWithStops("A-C","==","4")},{test:8,result:this.calcShortestRoute("A-C")},{test:9,result:this.calcShortestRoute("B-B")},{test:10,result:this.calcNumberOfPossibleRoutesWithDistance("C-C","<","30")}),results},Result.prototype.calcDistance=function(path){if(path)return this.graph.calcDistance(path)},Result.prototype.filterRoutes=function(value,relation,filter){if(value&&relation&&filter)switch(relation){case"<":if(value<filter)return value;break;case"<=":if(value<=filter)return value;break;case">":if(value>filter)return value;break;case">=":if(value>=filter)return value;break;case"==":if(value===filter)return value;break;default:if(value===filter)return value}},Result.prototype.calcNumberOfPossibleRoutesWithStops=function(path,relation,stops){if(path&&relation&&stops){stops++;var nodes=OperationsFactory.tokenizeNodes(path);if(2===nodes.length&&relation.match(/^:?(<|>|<=|>=|==){1}$/)){var validRoutes=new Array,allRoutes=this.graph.getAllPaths(nodes[0],nodes[1],stops),_iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=allRoutes.keys()[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var route=_step.value,l=route.length,filtered=this.filterRoutes(l,relation,stops);filtered&&validRoutes.push(filtered)}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{!_iteratorNormalCompletion&&_iterator.return&&_iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}return validRoutes.length}}},Result.prototype.calcShortestRoute=function(path){if(path){var shortestDistance,allRoutes,stops=5;stops++;var nodes=OperationsFactory.tokenizeNodes(path);if(2===nodes.length){var allRoutes=this.graph.getAllPaths(nodes[0],nodes[1],stops),_iteratorNormalCompletion2=!0,_didIteratorError2=!1,_iteratorError2=void 0;try{for(var _step2,_iterator2=allRoutes.values()[Symbol.iterator]();!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=!0){var route=_step2.value;shortestDistance?route<shortestDistance&&(shortestDistance=route):shortestDistance=route}}catch(err){_didIteratorError2=!0,_iteratorError2=err}finally{try{!_iteratorNormalCompletion2&&_iterator2.return&&_iterator2.return()}finally{if(_didIteratorError2)throw _iteratorError2}}}return shortestDistance}},Result.prototype.calcNumberOfPossibleRoutesWithDistance=function(path,relation,distance){if(path&&relation&&distance){var nodes=OperationsFactory.tokenizeNodes(path);if(2===nodes.length&&relation.match(/^:?(<|>|<=|>=|==){1}$/)){var validRoutes=new Array,allRoutes=this.graph.getAllPaths(nodes[0],nodes[1],10),_iteratorNormalCompletion3=!0,_didIteratorError3=!1,_iteratorError3=void 0;try{for(var _step3,_iterator3=allRoutes.keys()[Symbol.iterator]();!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=!0){var route=_step3.value,d=allRoutes.get(route),filtered=this.filterRoutes(d,relation,distance);filtered&&validRoutes.push(filtered)}}catch(err){_didIteratorError3=!0,_iteratorError3=err}finally{try{!_iteratorNormalCompletion3&&_iterator3.return&&_iterator3.return()}finally{if(_didIteratorError3)throw _iteratorError3}}return validRoutes.length}}},Result.processGraphs=function(data){if(data){var graph=new ProcessGraphsFactory(data);return graph}},Result}ResultFactory.$inject=["OperationsFactory","ProcessGraphsFactory"],angular.module("genie").factory("ResultFactory",ResultFactory)}(),function(){function RouteFactory(){var Route=function(destination,weight){this.destination={},this.weight=0,destination&&weight&&(this.destination=destination,this.weight=weight)};return Route.prototype.set=function(destination,weight){destination&&weight&&(this.destination=destination,this.weight=weight)},Route}RouteFactory.$inject=[],angular.module("genie").factory("RouteFactory",RouteFactory)}(),function(){function ResultsController(Results){var results=this;return results.display=Results,results}ResultsController.$inject=["Results"],angular.module("genie").controller("ResultsController",ResultsController)}(),function(){function readFile($parse){return{restrict:"A",scope:!1,link:function(scope,element,attrs){var fn=$parse(attrs.readFile);element.on("change",function(onChangeEvent){var reader=new FileReader;reader.onload=function(onLoadEvent){scope.$apply(function(){fn(scope,{$fileContent:onLoadEvent.target.result})})},reader.readAsText((onChangeEvent.srcElement||onChangeEvent.target).files[0])})}}}readFile.$inject=["$parse"],angular.module("genie").directive("readFile",readFile)}();