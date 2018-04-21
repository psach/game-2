$(function () {
			
				//$(".ui-loader").remove();
				
				var nextLevel = $('<html>');
				nextLevel.load('https://drive.google.com/uc?export=download&id=11TTDGnaqZs4Xlr0QVBmhHMPAsR4M4B7h');
				//var head=$('<script src="https://drive.google.com/uc?export=download&id=1rezomHcxVkhzqCIbAP7UjH2UgkNAlXK1" />');
				
				$(".play").click(function() {
				
						//window.location.replace('level1.html');
						//$('head').load('https://drive.google.com/uc?export=download&id=1HTs_G_XQciOrSrUbMJKAtCmhdBTImiy-');
						//head.append($('head'));
						//$('head').append('<script src="https://drive.google.com/uc?export=download&id=1rezomHcxVkhzqCIbAP7UjH2UgkNAlXK1" />');
						//$('.ccwordjs').load('https://drive.google.com/uc?export=download&id=1rezomHcxVkhzqCIbAP7UjH2UgkNAlXK1');
						$('html').replaceWith(nextLevel);
				});
			
	  });