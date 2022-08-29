const handleThoughtSubmit = event => {
    event.preventDefault();
  
    const thoughtText = $thoughtForm.querySelector('#thought-text').value;
    const createdAt = $thoughtForm.querySelector('#createdAt').value;
    const thoughtName = $thoughtForm.querySelector('#thought-name').value;
    const reactions = [...$thoughtForm.querySelectorAll('[text=reactions]:checked')].map(reactions => {
      return reactions.value;
    });
  
    if (!thoughtText || !createdAt || !thoughtName.length || reactions) {
      return;
    }
  
    const formData = { thoughtText, createdAt, thoughtName, reactions };
  };
  