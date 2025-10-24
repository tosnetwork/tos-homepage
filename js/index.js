window.onload=function(){
  				var question1=document.getElementById('question1');
  				var question2=document.getElementById('question2');
  				var question3=document.getElementById('question3');
  				var question4=document.getElementById('question4');
  				var question5=document.getElementById('question5');
  				var question6=document.getElementById('question6');
  				var question7=document.getElementById('question7');
  				
  				document.getElementById('what-is-tos').addEventListener('click',function(){
  					if(question1.style.display=="none"){
  						question1.style.display="block";
  					}else{
  						question1.style.display="none";
  					}
  				});
  				document.getElementById('tos-advantages').addEventListener('click',function(){
  					if(question2.style.display=="none"){
  						question2.style.display="block";
  					}else{
  						question2.style.display="none";
  					}
  				})
  				document.getElementById('can-i-mine-tos').addEventListener('click',function(){
  					if(question3.style.display=="none"){
  						question3.style.display="block";
  					}else{
  						question3.style.display="none";
  					}
  				})
  				document.getElementById('not-ico').addEventListener('click',function(){
  					if(question4.style.display=="none"){
  						question4.style.display="block";
  					}else{
  						question4.style.display="none";
  					}
  				})
  				document.getElementById('tos-goals').addEventListener('click',function(){
  					if(question5.style.display=="none"){
  						question5.style.display="block";
  					}else{
  						question5.style.display="none";
  					}
  				})
  				document.getElementById('tos-trade-options').addEventListener('click',function(){
  					if(question6.style.display=="none"){
  						question6.style.display="block";
  					}else{
  						question6.style.display="none";
  					}
  				})
  				document.getElementById('how-tos-works').addEventListener('click',function(){
  					if(question7.style.display=="none"){
  						question7.style.display="block";
  					}else{
  						question7.style.display="none";
  					}
  				})
  			}