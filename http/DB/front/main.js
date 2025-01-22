fetch("http://localhost:4000/api/courses?page=3").then((res) => {
  console.log(res);
  res.json().then((data) => {
    console.log(data);
  });
});
