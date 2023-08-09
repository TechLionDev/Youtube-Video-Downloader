import { useState } from 'react'

const Home = () => {
	const [url, setUrl] = useState('')

	function isValidYouTubeUrl(url) {
		const pattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/;
		return pattern.test(url);
	}
	
	async function getVideoData(youtubeUrl) {
		const response = await fetch('https://www.youtube.com/youtubei/v1/player?key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w', {
			method: 'POST',
			headers: {
				'User-Agent': 'com.google.android.youtube/17.36.4 (Linux; U; Android 12; GB) gzip'
			},
			body: JSON.stringify({
				"videoId": getYouTubeVideoId(youtubeUrl),
				"context": {
					"client": {
						"clientName": "ANDROID",
						"clientVersion": "17.10.35",
						"androidSdkVersion": 30
					}
				}
			}),
		})
		const data = await response.json();
		
		return data
	}
	
	function getYouTubeVideoId(youtubeUrl) {
		return youtubeUrl.split('v=')[1].split('&')[0];
	}

	async function download(e) {
		e.preventDefault();
		let url  = e.target[0].value
		if (isValidYouTubeUrl(url)) {
			let data = await getVideoData(url);
			console.log(data);
		} else {
			alert('Invalid YouTube URL')
        }
	}

	return (
		<div className='flex items-center justify-center w-full h-screen'>
			<form onSubmit={download} className='flex gap-4'>
				<div className="flex items-center text-gray-400 border rounded-md">
					<input
						type="text"
						value={url}
						onChange={(e) => {
							setUrl(e.target.value);
						}}
						className="w-full p-2.5 bg-transparent outline-none"
						placeholder="Enter YouTube URL"
					/>
				</div>
				<button type="submit" className='px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg'>Download</button>
			</form>
		</div>
	);
}

export default Home;