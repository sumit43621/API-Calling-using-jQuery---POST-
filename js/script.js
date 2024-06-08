var myurlobject = {
    url:'https://fakerestapi.azurewebsites.net',
    type:"GET",
}

document.querySelector('[data-myattr="getdata"]').addEventListener('click',function(){
    // alert('okkk')
    swal("Good job!", "You clicked the button!", "success");

    $.ajax({
        ...myurlobject,
        url:myurlobject.url + '/api/v1/Activities',
        beforeSend:function(){
            document.querySelector('.s_loader').classList.remove('invisible');
        },
        success:function(result,status,xhr){
            document.querySelector('.s_loader').classList.add('invisible');
            console.log(result);
            var tr = ``;
            result.forEach(element => {
                console.log(element);
                tr += `<tr>
                            <td>`+ element.id +`</td>
                            <td>`+ element.title +`</td>
                            <td>`+ element.completed +`</td>
                            <td>`+ element.dueDate +`</td>
                            <td>
                                <button class="btn btn-sm btn-success">View</button>
                                <button class="btn btn-sm btn-info">Edit</button>
                                <button class="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>`
            });
            document.querySelector('table > tbody').innerHTML = tr;

        },
        error:function(){

        },
        complete:function(){

        },
    })
})

document.getElementById('myaddform').onsubmit = function(e){
    e.preventDefault();
    // alert("okkk")
    let title = e.target.querySelector('input[name="title"]').value;
    let duedate = e.target.querySelector('input[name="duedate"]').value;
    let is_completed = Boolean(e.target.querySelector('select[name="is_completed"]').value);

    let mydata = {
            "id": 0,
            "title": title,
            "dueDate": duedate,
            "completed": is_completed 
        }

    $.ajax({
        ...myurlobject,
        url: myurlobject.url + '/api/v1/Activities',
        type:"POST",
        data: JSON.stringify(mydata),
        dataType: 'json',
        contentType: 'application/json',
        success:function(result,success,xhr){
            swal("Good job!", "Activity saved successfully", "success")
        }
    })
}