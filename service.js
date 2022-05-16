import TrackPlayer from 'react-native-track-player';


module.exports = async function () {
    TrackPlayer.addEventListener('remote-play', () => 
    TrackPlayer.play());
    TrackPlayer.addEventListener('remote-pause', ()=> 
    TrackPlayer.pause());
    TrackPlayer.addEventListener('remote-next', ()=> 
    TrackPlayer.skipToNext());
    TrackPlayer.addEventListener('remote-previous', ()=> 
    TrackPlayer.skipToPrevious());
    TrackPlayer.addEventListener('playback-track-changed',()=> 
    TrackPlayer.getState());
    TrackPlayer.addEventListener('playback-queue-ended', ()=> 
    TrackPlayer.getQueue())
};