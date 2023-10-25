document.addEventListener('DOMContentLoaded', function () {
    const tweetForm = document.getElementById('tweetForm');
    const tweetText = document.getElementById('tweetText');
    const responseDiv = document.getElementById('response');
    tweetForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const tweet = tweetText.value;
        
        fetch('https://one00x-data-analysis.onrender.com/posts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                 post: {
                    content : tweet
                 } 
            }),
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Tweet posting failed'); 
            }})
        .then(data => {
            console.log(data)
            responseDiv.innerText = `Tweet posted successfully! Tweet ID: ${data.id}`;})
        .catch(error => {
            responseDiv.innerText = `Error: ${error.message}`;
        })
        .finally(()=>{
            setTimeout(()=>{
                tweetText.value = ""
            }, 1000);
        }
        );
    });
});
