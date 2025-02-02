fetch("http://localhost:4000/api/courses?page=3").then((res) => {
  console.log(res);
  res.json().then((data) => {
    console.log(data);
  });
});

let a = [1, 2, 3, 4, 5, 6];
var left = 0,
  right = 5;
var found = false;
var target = 5;
while (left <= right) {
  var mid = Math.floor((left + right) / 2);
  // mid = 4
  if (a[mid] == target) {
    found = true;
    break;
  } else if (a[mid] < target) {
    //3<5
    left = mid + 1;
    // left=3
  } else {
    right = mid - 1;
  }
}
if (found) {
  print("YES");
} else {
  print("NO");
}
