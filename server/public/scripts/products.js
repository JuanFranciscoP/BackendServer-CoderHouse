const socket = io(); 
  socket.on("products", data => { console.log(data) 
  let template = ``; 
  template = data.map(each=> 
  `<div class="w-[14rem] h-[20rem] bg-white items-center border-black rounded-md m-2 border-2 border-gray-600 border-opacity-80 transition-transform transform hover:scale-105 duration-300"> 
      <img src="${each.photo}" class="w-full h-[60%] object-cover"></img> 
      <div class="mt-2"> 
        <p class="text-center text-gray-600 font-medium">${each.title}</p> 
        <p class="text-center text-gray-600 font-medium">Price:$${each.price}</p> 
        <p class="text-center text-gray-600 font-light">stock:${each.stock}</p> 
      </div>
  </div>` ).join("")
  document.querySelector('#products').innerHTML = template
  });