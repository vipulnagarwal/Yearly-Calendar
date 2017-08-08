function calendarRow()
{
    clsName = "";
    innerValue = "";
    curDateString = "";
}
yearlyCalendar.controller('yearlyCalendarController', function($scope) {
    debugger;
    $scope.firstName = "Vipul";
    $scope.lastName = "Agarwal";
    
    $scope.customAttributes = {
      holidays: [
          '2017-04-25',
          '2017-06-02'
      ],      
      weekend: [0,6],        
      firstDayOfWeek: 0,
      showWeekSeparator:true
    };
    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    $scope.fullDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    $scope.fullmonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    $scope.today = new Date();
    
    $scope.exists = function (item, list) {
        debugger;
        var itm = $scope.fullDays.indexOf(item);
        return list.indexOf(itm) > -1;
    };
    
    $scope.toggleSelection = function (item) {
        var itm = $scope.fullDays.indexOf(item);
        debugger;
        var idx = $scope.customAttributes.weekend.indexOf(itm);
        // is currently selected
        if (idx > -1) {
            $scope.customAttributes.weekend.splice(idx, 1);
        }
        // is newly selected
        else {
            $scope.customAttributes.weekend.push(itm);
        }
        $scope.daysOfAYear($scope.state.year);
    };
    
    $scope.state = {
      year: $scope.today.getFullYear(),
      selectedDay: $scope.today,
      showWeekSeparators: true, 
      customAttributes:$scope.customAttributes
    };
    
    $scope.createCurDateString = function (givenYear, m, d){
        var year = givenYear.toString();
        var month = (m < 9)?'0'+m.toString():m.toString();
        var date = (d < 9)?'0'+d.toString():d.toString();
        
        return year + '-' + month + '-' + date;
    }
    
    $scope.selectThis = function (dt){
        debugger;
        //var dt = $scope.createCurDateString(givenYear, m, d);
        var idx = $scope.customAttributes.holidays.indexOf(dt);
        if (idx > -1) {
            $scope.customAttributes.holidays.splice(idx, 1);
        }
        // is newly selected
        else {
            $scope.customAttributes.holidays.push(dt);
        }
        $scope.daysOfAYear($scope.state.year);
    }
    
    $scope.daysOfAYear = function(givenYear) {
        						// /// New code
						$scope.months1 = [];
						for ( var m = 1; m < 13; m++ ) {
							var sep = 0;
							var a = 0;
							var firstDay = new Date( givenYear, m - 1, 1 );
							console.log( firstDay )
							var lastDay = new Date( givenYear, m, 0 );
							$scope.months1[ m - 1 ] = [];
							$scope.months1[ m - 1 ][ sep ] = [];
							for ( var n = 1; n <= firstDay.getDay(); n++ ) {

								if ( a % 7 == 0 ) {
									sep++;
									$scope.months1[ m - 1 ][ sep ] = [];
									a = 0;
									$scope.months1[ m - 1 ][ sep ][ a ] = '';
								}
								else {
									$scope.months1[ m - 1 ][ sep ][ a ] = '';
								}
								a++;
							}

							var printD = 1;

							for ( var n = firstDay.getDate(); n <= lastDay.getDate(); n++ ) {

								if ( a % 7 == 0 ) {
									sep++;
									a = 0;
									$scope.months1[ m - 1 ][ sep ] = [];
									var d = new Date( givenYear, m - 1, printD );
									var clndrDay = new calendarRow();
									clndrDay.clsName += "day-content";
									clndrDay.curDateString = $scope.createCurDateString( givenYear, m, printD );
									clndrDay.innerValue = d.getDate();
									var curDate = $scope.createCurDateString( givenYear, m, printD );
									if ( $scope.customAttributes.holidays.indexOf( curDate ) > -1 ) {
										if ( clndrDay.clsName.indexOf( 'holidays' ) > -1 ) {
											clndrDay.clsName = "day-content";
										}
										else {
											clndrDay.clsName += " holidays";
										}
									}
									$scope.months1[ m - 1 ][ sep ][ a ] = clndrDay;
								}
								else {
									var d = new Date( givenYear, m - 1, printD );
									var clndrDay = new calendarRow();
									clndrDay.clsName += "day-content";
									clndrDay.curDateString = $scope.createCurDateString( givenYear, m, printD );
									clndrDay.innerValue = d.getDate();
									var curDate = $scope.createCurDateString( givenYear, m, printD );
									if ( $scope.customAttributes.holidays.indexOf( curDate ) > -1 ) {
										if ( clndrDay.clsName.indexOf( 'holidays' ) > -1 ) {
											clndrDay.clsName = "day-content";
										}
										else {
											clndrDay.clsName += " holidays";
										}
									}
									$scope.months1[ m - 1 ][ sep ][ a ] = clndrDay;
								}
								a++;
								printD++;
							}
						}
						// /// New code
        debugger;
        $scope.yearCalendar = {};
        $scope.yearCalendar.days = [];
        var allHeads = [];
        //var allDays = [];
        var givenFirstDay = $scope.customAttributes.firstDayOfWeek;
        var separator = 0;
        
        for(var m=0;m<13;m++){               
            if(m == 0){
                allHeads[0] = new calendarRow();
                allHeads[0].clsName = "";
                allHeads[0].innerValue = "";
                for(var i=1;i<43;i++){
                    separator++;
                    allHeads[i] = new calendarRow();
                    allHeads[i].innerValue = $scope.days[givenFirstDay++];
                    if(givenFirstDay == $scope.customAttributes.firstDayOfWeek)
                        allHeads[i].clsName = "bolder";
                    if(givenFirstDay>=$scope.days.length)
                        givenFirstDay = 0;
                    if(separator%7 == 0){
                        allHeads[i+1] = new calendarRow();
                        allHeads[i+1].innerValue = "";
                        allHeads[++i].clsName = "week-separator";
                        separator = 0;
                    }
                }
                $scope.yearCalendar.heads = allHeads;
            }
            else {
                var allDays = [];
                allDays[0] = new calendarRow();
                allDays[0].innerValue = $scope.months[m-1];
                allDays[0].clsName = "bolder";
                var i = 1;
                separator = 0;
                var firstDay = new Date(givenYear, m-1, 1);
                var lastDay = new Date(givenYear, m, 0);
                var printDate = 0;
                var manageSpace = 0;
                
                /*if(firstDay.getDay() < givenFirstDay){
                    manageSpace = 7 - givenFirstDay;
                }*/
                
                for(var n=1; n<=firstDay.getDay();n++){
                    separator++;
                    allDays[i] = new calendarRow();
                    allDays[i].clsName = "";
                    allDays[i].innerValue = "";
                    i++;
                }
                for(var n=firstDay.getDate(); n<=lastDay.getDate();n++){
                    separator++;
                    var dt = new Date(givenYear, m-1, n);
                    allDays[i] = new calendarRow();
                    if($scope.customAttributes.weekend.indexOf(dt.getDay()) >= 0){
                        allDays[i].clsName = "weekend";
                    }
                    debugger;
                    var curDate = $scope.createCurDateString(givenYear, m, printDate+1);
                    if($scope.customAttributes.holidays.indexOf(curDate) > -1){
                        if(allDays[i].clsName != null){
                            allDays[i].clsName = "holidays";
                        }
                        else {
                            allDays[i].clsName += " holidays";
                        }
                    }
                    allDays[i].innerValue = ++printDate;
                    allDays[i].curDateString = $scope.createCurDateString(givenYear,m,printDate);
                    if(separator % 7 == 0){
                        i++;
                        allDays[i] = new calendarRow();
                        allDays[i].innerValue = "";
                        allDays[i].clsName = "week-separator";
                        separator = 0;
                    }
                    i++;
                }
                for(var n=i; n<42;n++){
                    separator++;
                    allDays[i] = new calendarRow();
                    allDays[i].clsName = "";
                    allDays[i].innerValue = "";
                    if(separator % 7 == 0){
                        i++;
                        allDays[i] = new calendarRow();
                        allDays[i].innerValue = "";
                        allDays[i].clsName = "week-separator";
                        separator = 0;
                    }
                    i++;
                }
                $scope.yearCalendar.days[m] = []; 
                $scope.yearCalendar.days[m] = allDays;
            }            
        }        
        console.log($scope.yearCalendar);
    }
    $scope.daysOfAYear($scope.state.year);
    
    $scope.nextYear = function (){
        $scope.state.year += 1;
        $scope.daysOfAYear($scope.state.year);        
    }
    $scope.previousYear = function (){
        $scope.state.year -= 1;
        $scope.daysOfAYear($scope.state.year);        
    }
});
