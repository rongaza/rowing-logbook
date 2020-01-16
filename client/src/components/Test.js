import React from 'react';

const Test = () => {
	const [data, setData] = React.useState({});

	React.useEffect(() => {
		fetch('/api/test')
			.then(res => res.json())
			.then(text => setData(text))
			.catch(error => {
				console.error('Error:', error);
			});
	}, []);
	console.log(data);
	return <div>{data.message ? data.message : 'nothing'}</div>;
};

export default Test;
