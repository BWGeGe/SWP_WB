1:

/^_\w+/

_user (gültig)
_data (gültig)
_aadsads (gültig)
_ (ungültig)
asdf (ungültig)

2:

/(\s+(.+))+/

[INFO]   User:123   Action:login

3:

/console\.log\(\s*['"]([^"^']+)['"]\s*\)/

console.log('irgendein Text')
console.log( 'text' )

4:

public\s*(\w+)\s*(\w+)

public int UserId { get; set; }
public string UserName { get; set; }