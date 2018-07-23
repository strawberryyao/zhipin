export function getRedirectTo(type,header) {
  let path = '';
  if(type === 'BigGod'){
    path = '/biggod'
  }else{
    path = '/boss'
  }
  if(!header) {
    path += 'info';
  }
  return path;
}