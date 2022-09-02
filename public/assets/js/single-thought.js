function getThought() {
    //get id of thought
    const thoughtId = searchParams.get('id');   
    
    //get thought info
    // fetch(`/api/comments/${userId}/{${thoughtId}`, {
    //     method: 'PUT',
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(formData)
    // })
    //   .then(response => response.json()) 
    //   .then(postReaction => {
    //     console.log(postReaction);
    //   })
   
    fetch(`/api/thought-routes/${thoughtId}`)
    .then(response => {
        //check for a 4xx or 5xx error from server
        if(!response.ok) {
            throw new Error({ message: 'Something went wrong!' });
        } 
        
        return response.json();
    })
    .then(printThought)
    .catch(err => {
        console.log(err);
        alert('Cannot find a thought with this id! Taking you back.');
        window.history.back();
    });
}

getThought();