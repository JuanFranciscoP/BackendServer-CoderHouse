const socket = io()
socket.on("users", data=> {
    console.log(data)
    let template = ``
    template = data.map(each=> 
        `
    <div class="w-[20rem] h-[20rem] bg-white items-center border-black rounded-md m-2 border-2 border-gray-600 border-opacity-80 transition-transform transform hover:scale-105 duration-300"> 
      <img src="${each.photo}" class="w-full h-[60%] object-cover"></img> 
      <div class="mt-2 flex flex-col items-center"> 
        <p class="text-center text-gray-600 font-medium">${each.email}</p>
        <a href="/users/${each.id}" class="text-center w-[80%] h-[2rem] bg-gray-600 rounded-lg mt-6 text-white">Details</a>
      </div>
    </div>    
        `
    ).join("")
    document.querySelector('#users').innerHTML = template
})