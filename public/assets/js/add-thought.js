function handleNewThoughtSubmit(event) {
  event.preventDefault();

    const thoughtText = $newThoughtForm.querySelector('#thought').value;
    const username = $newThoughtForm.querySelector('#username').value;

    if (!thoughtText || username)
    return false;

    const formData = { thoughtText, username };

    fetch(`/api/${thought-routes}`, {
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
    .then(thoughtResponse => {
      console.log(thoughtResponse);
      locatoin.reload();
    })
    .catch(err => {
      console.log(err);
    })
}

function handleNewReaction(event) {
  event.preventDefault;

  if(!event.target.matches('.reply-form')) {
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
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
    )}
    .then(response => {
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }
      response.json();
    })
    .then(thoughtResponse => {
      console.log(thoughtResponse);
      locatoin.reload();
    })
    .catch(err => {
      console.log(err);
    })

    handleNewReaction();

    

