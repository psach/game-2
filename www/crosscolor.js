var moreCount=1;
var insertCorrect=0;
var levelAnswered=0;
var currLevel=1;
var stringCorrect ="";
var selectionTillLast=[];
		
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}




function popWords(words){

						$(".wordset").remove();
						$.each(words, function(i, word) {
							
							
							var tr = $('<tr class="wordset">');
						
							$.each(word.split(''), function(j,character){
								$('<td class="cwd-tile-word" ><div class="cwd-tile-letter d3 '+character+'" word='+word+' style="margin-top: 0px;"> '+character+'</div></td>').appendTo(tr);
						
						});
						
						
						
							tr.appendTo(tbody);
						});
						
				$("#words").find(".cwd-tile-letter").click(function() {
				var word = $(this).attr('word');
				var invalid = false;
				
				var arr=[];
					for (i = 0; i < selectionTillLast.length; i++) {
						arr.push(selectionTillLast[i][2]);
				}
				
				
				
				//alert(word + " : " + activeSet.length);
				
				if(activeSet && activeSet.length==word.length ){
				
				
					$.each(word.split(''), function(j,character){
					//alert("["+$(activeSet[j]).html()+"] : " + character);
					
						if ( $(activeSet[j]).html()!= ' ' && !invalid ) {
							invalid = $(activeSet[j]).html()!=character;
							
						}
						
				
					});
					
					
					
					
				
				}else{
					invalid=true;
				}
				
				
				if( invalid ) { 
				
					//alert('Incorrect selection');
					activeSet.parent().removeClass('cwd-tile-highlight');
					activeSet.parent().addClass('cwd-tile-incorrect');
				
				}else{
					var stringSelected = ""+arr+","+word;
					
					stringCorrect = stringCorrect.replace(word,"|");
					//alert((stringCorrect.split('|').length + stringCorrect.split('|').length-3) + " : " + stringCorrect.length );
					var answered = ((stringCorrect.split('|').length + stringCorrect.split('|').length-3)==stringCorrect.length);
					
					//levelAnswered = answered?levelAnswered++:levelAnswered;
					//var levelAnswered = correctAns.match("^"+startWord);
					//var levelAnswered = correctAns.match(endWord+"$");
					
					
					//alert(stringSelected + " : " + stringCorrect );
					
					
					$.each(word.split(''), function(j,character){
					
						
						$(activeSet[j]).addClass(character);
						$(activeSet[j]).addClass('d3');
						$(activeSet[j]).html(character);
						
					});
					
					if(levelAnswered==correctAns.length-1 && answered ){
						window.location.replace(nextLevel)
					}
					
					if(answered){
						levelAnswered++;
						setStartEnd(++currLevel);
					}
					selectionTillLast.push([clueid,id,word]);
				};
				
			});	
			}
			
			function setStartEnd(level){
				
				$.each(correctAns[level], function(i, correctWord) {
				
					var randomChild = getRandomArbitrary(0,3);
					var random = getRandomArbitrary(0,moreWords.length);
					moreWords[random][randomChild]=correctWord;
					
				
				});
					//$($('['+activeList[0]+'='+activeList[1]+'] div')[j]).html(character);
					//$($('['+activeList[0]+'='+activeList[1]+'] div')).removeClass(character);
					/* var clearGrid =$("#crossword").find(".cwd-tile-active");
					var gridChild=clearGrid.children();
					
					gridChild.html(' ');
					gridChild.removeAttr('class');
					clearGrid.removeAttr('class');
					
					clearGrid.addClass('cwd-tile cwd-tile-active');
					gridChild.addClass('cwd-tile-letter'); */
					
					var clearGrid =$("#crossword").find(".cwd-tile-active");
					clearGrid.removeAttr('class');
					clearGrid.addClass('cwd-tile cwd-tile-active');
					var gridChild=clearGrid.find('.cwd-tile-letter');
					gridChild.html(' ');
					gridChild.removeAttr('class');
					gridChild.addClass('cwd-tile-letter');
					
				
				//alert(level);
				stringCorrect = ""+correctAns[level];
				var correctAnsItem=correctAns[level];
				currLevel=level;
				var greenChar, redChar;
				
				if (endCell[level][0]<startCell[level][0]){
					greenChar=correctAnsItem[0][correctAnsItem[0].length-1];
					redChar = correctAnsItem[correctAnsItem.length-1][0];
					
				}else{
					greenChar=correctAnsItem[0][0];
					redChar = correctAnsItem[correctAnsItem.length-1][correctAnsItem[correctAnsItem.length-1].length-1];
					
					
				}
				var start = $("[row="+startCell[level][0]+"][col="+startCell[level][1]+"]");
				start.addClass("green");
				
				start.find('.cwd-tile-letter').html(greenChar);
				
				var end = $("[row="+endCell[level][0]+"][col="+endCell[level][1]+"]");
				end.addClass("red");
				end.find('.cwd-tile-letter').html(redChar);
				
				var gridParent = $("#cwd-grid").parent();
				var gridClone = $("#cwd-grid").clone(true);
				$("#cwd-grid").remove();
				
				gridClone.appendTo(gridParent).fadeOut('slow');
				gridClone.appendTo(gridParent).fadeIn('slow');
				
			
			}
			
        $(function () {
		
			$.mobile.loading().hide();
			
			tbody = $('#words');
			
			setStartEnd(currLevel);
			popWords(moreWords[0]);
			
			
			$(".clear").click(function() {
				//$("#crossword").find(".cwd-tile-letter").html(' ');
				
				if(activeSet){
				
				activeSet.html(' ');
				activeSet.removeClass('d3');
				}
				setStartEnd(currLevel);
				var activeId=$(activeSet[0]).parent().attr(clueid);
				
				$.each(selectionTillLast, function(i, activeList) {
				
					
						
				
						
					
						//alert(""+activeList);
						
							$.each(activeList[2].split(''), function(j,character){
						
									//alert('['+activeList[0]+'='+activeList[1]+']');
									
									if(activeList[1]!=activeId){
										$($('['+activeList[0]+'='+activeList[1]+'] div')[j]).html(character);
										
									}else{
										activeList[2]='';
									}
							});
						
					
					
					
					
				
				
				});
				selectionTillLast.pop();
				
							
				
			});
			
			
				
			/*$(".more").click(function() {
			
				popWords(moreWords[moreCount++]);
				if(moreCount==moreWords.length)moreCount=0;
				
			});*/
			
			$( ".word-container" ).on( "swiperight", function(){
				
				moreCount++;
				if(moreCount==moreWords.length)moreCount=0;
				popWords(moreWords[moreCount]);
			});
			
			$( ".word-container" ).on( "swipeleft", function(){
				
				moreCount--;
				if(moreCount==-1)moreCount=moreWords.length-1;
				popWords(moreWords[moreCount]);
			});
			
			
			
		
			$("#crossword").find(".cwd-tile-active").click(function() {
			
				$(".cwd-tile").removeClass("cwd-tile-highlight");	
				$(".cwd-tile").removeClass("cwd-tile-incorrect");	
				
				
				
				
				$(this).addClass("cwd-tile-highlight");
				
				
				
				 id = $(this).attr('acrossclueid');
				
				 clueid=id?'acrossclueid':'downclueid';
				
				id = id?id:$(this).attr('downclueid');
				
				
				
				
				activeSet= $('*['+clueid+'="'+id+'"]');
				
				//activeSet=activeSet.length>0?activeSet:$('*[downclueid="'+id+'"]');
				activeSet.addClass("cwd-tile-highlight");
				
				activeSet=activeSet.find('.cwd-tile-letter');
				
				
				
				
				
				
			});	
			
			
			
			
			
			
			
			
		});
		   