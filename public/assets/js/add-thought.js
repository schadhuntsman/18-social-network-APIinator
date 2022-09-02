// function getThought() {
//   event.preventDefault();
    const handleThoughtSubmit = event => {
      event.preventDefault();
    
    // const username = $newThoughtForm.querySelector('#thought-name').value;
    const thought = $newThoughtForm.querySelector('#thought').value;
    const username = $newThoughtForm.querySelector('#username').value;
    const thoughtText = $newThoughtForm.querySelector('#thought').value;
    map(thoughtText => {
      return thoughtText.value;
    });

    if (!thought || username || thoughtText.length)
    return;

    const formData = { thought,  username, thoughtText };

    fetch(`/api/thought-routes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formData)
    })
    .then(response => {
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }
      response.json();
    })
    then(response => response.json())
    .then(postResponse => {
      console.log(postResponse);
    })
      
    .catch(err => {
      console.log(err);
      saveRecord(formData);
    })
}

function handleNewReaction(event) {
  event.preventDefault;

  if(!event.target.matches('.reaction-form')) {
    return false;
  }

const thoughtId = event.target.getAttribute('data-thoughtid');

    const username = event.target.querySelector('[name=reaction-name]').value;
    const reactionBody = event.target.querySelector('[name=reaction]').value;
    
    if (!thoughtText || username) {
      return false;
    }

    const formData = { username, reactionBody };

    fetch(`/api/comments/${userId}/{${thoughtId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => { 
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    response.json();
  })
  .catch(err => {
    console.log(err);
    })

    handleNewReaction();
    getThought();

    

