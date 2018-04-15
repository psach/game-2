
function popWords(words){

						$(".wordset").remove();
						$.each(words, function(i, word) {
							
							
							var tr = $('<tr class="wordset">');
						
							$.each(word.split(''), function(j,character){
								$('<td class="cwd-tile-word cwd-tile-active" ><div class="cwd-tile-letter d3 '+character+'" word='+word+' style="margin-top: 0px;"> '+character+'</div></td>').appendTo(tr);
						
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
				
				
				
				//alert(word);
				
				if(activeSet && activeSet.length==word.length ){
				
				
					$.each(word.split(''), function(j,character){
					//alert("["+$(activeSet[j]).html()+"]");
					
						if ( $(activeSet[j]).html()!= ' '  ) {
							invalid = $(activeSet[j]).html()!=character;
						}
						
				
					});
					
					
					
					
				
				}else{
					invalid=true;
				}
				
				
				if( invalid ) { 
				
					alert('Incorrect selection');
				
				}else{
					var stringSelected = ""+arr+","+word;
					stringCorrect = stringCorrect.replace(word,"|");
					//alert((stringCorrect.split('|').length + stringCorrect.split('|').length-3) + " : " + stringCorrect.length );
					var levelAnswered = ((stringCorrect.split('|').length + stringCorrect.split('|').length-3)==stringCorrect.length);
					//var levelAnswered = correctAns.match("^"+startWord);
					//var levelAnswered = correctAns.match(endWord+"$");
					
					
					//alert(stringSelected + " : " + stringCorrect );
					
					
					$.each(word.split(''), function(j,character){
					
						
						$(activeSet[j]).addClass(character);
						$(activeSet[j]).addClass('d3');
						$(activeSet[j]).html(character);
						
					});
					if(levelAnswered)window.location.replace(nextLevel);
					selectionTillLast.push([clueid,id,word]);
				};
				
			});	
			}
			
			function setStartEnd(){

				var start = $(startCell);
				start.addClass("green");
				
				start.find('.cwd-tile-letter').html(correctAns[0][correctAns[0].length-1]);
				
				var end = $(endCell);
				end.addClass("red");
				end.find('.cwd-tile-letter').html(correctAns[correctAns.length-1][0]);
			}
			
        $(function () {
		
			tbody = $('#words');
			
			setStartEnd();
			
			
			
			$(".clear").click(function() {
				//$("#crossword").find(".cwd-tile-letter").html(' ');
				
				if(activeSet){
				
				activeSet.html(' ');
				activeSet.removeClass('d3');
				}
				setStartEnd();
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
			
			
			$(".more").click(function() {
			
				popWords(moreWords[moreCount++]);
				if(moreCount==moreWords.length)moreCount=0;
				
				

				
			});
			
			popWords(moreWords[0]);
			
		
			$("#crossword").find(".cwd-tile-active").click(function() {
			
				$(".cwd-tile").removeClass("cwd-tile-highlight");	
				
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
		   