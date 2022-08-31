const getThoughtList = () => {
    fetch('/api/thought-routes')
    .then(response => response.json())
    .then(thoughtListArr => {
        thoughtListArr.forEach(printThought);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getThoughtList();
