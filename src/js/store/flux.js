const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
				{
					title: "THIRD",
					background: "white",
					initial: "white"
				}
			],
			contacts: [
				{
					name: "conmtacto 1",
					phone: "1"
				},
				{
					name: "conmtacto 2",
					phone: "2"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				console.log('se cargo la pagina')
				fetch('https://playground.4geeks.com/contact/agendas/rick/contacts')
				.then( (response)=> response.json() )
				// .then( (data)=> console.log(data.contacts))
				.then( (data)=> setStore({ contacts: data.contacts }))
				
			},
			removeContact: (idToDelete) => {
				console.log('remove from flux '+ idToDelete)
				const store = getStore();
				// store.contacts = []
				const requestOptions = {
					method: "DELETE",
					redirect: "follow"
				  };
				  
				  fetch("https://playground.4geeks.com/contact/agendas/rick/contacts/"+idToDelete, requestOptions)
					.then((response) => response.text())
					.then((result) => {
						console.log(result)
						fetch('https://playground.4geeks.com/contact/agendas/rick/contacts')
						.then( (response)=> response.json() )
						// .then( (data)=> console.log(data.contacts))
						.then( (data)=> setStore({ contacts: data.contacts }))
					})
				// setStore({ contacts: store.contacts.filter( (contacto,index)=> contacto.id != idToDelete) });
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
