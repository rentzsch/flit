$(document).ready(function(){
    test('recursive dictionary: empty',function(){
        var d = new JRMutableDictionary();
        
        equals(0, d.count(), 'empty dictionary count is 0');
        equals(undefined, d.get('key1'), "get nonexistent slot's value");
        equals(false, d.hasKey('key1'), "ensure dictionary doesn't have an uninserted slot");
    });
    test('recursive dictionary: one slot',function(){
        var d = new JRMutableDictionary();
        
        d.put('key1', 'value1');
        equals(1, d.count(), 'dictionary count of 1');
        equals('value1', d.get('key1'));
        equals(undefined, d.get('key2'));
        equals(true, d.hasKey('key1'), "ensure dictionary has inserted slot");
        equals(false, d.hasKey('key2'), "ensure dictionary doesn't have uninserted slot");
        
        d.remove('key1');
        equals(0, d.count());
        equals(undefined, d.get('key1'));
        equals(undefined, d.get('key2'));
        equals(false, d.hasKey('key1'), "ensure dictionary doesn't have removed slot");
        equals(false, d.hasKey('key2'), "ensure dictionary doesn't have uninserted slot");
    });
    test('recursive dictionary: replace value',function(){
        var d = new JRMutableDictionary();
        
        d.put('key1', 'value1');
        equals(1, d.count(), 'dictionary count of 1');
        equals('value1', d.get('key1'));
        equals(undefined, d.get('key2'));
        equals(true, d.hasKey('key1'), "ensure dictionary has inserted slot");
        equals(false, d.hasKey('key2'), "ensure dictionary doesn't have uninserted slot");
        
        d.put('key1', 'value2');
        equals(1, d.count(), 'dictionary count of 1');
        equals('value2', d.get('key1'));
        equals(undefined, d.get('key2'));
        equals(true, d.hasKey('key1'), "ensure dictionary has inserted slot");
        equals(false, d.hasKey('key2'), "ensure dictionary doesn't have uninserted slot");
    });
    test('recursive dictionary: two slots',function(){
        var d = new JRMutableDictionary();
        
        d.put('key1', 'value1');
        d.put('key2', 'value2');
        equals(2, d.count(), 'dictionary count of 2');
        equals('value1', d.get('key1'));
        equals('value2', d.get('key2'));
        equals(undefined, d.get('key3'));
        equals(true, d.hasKey('key1'), "ensure dictionary has inserted slot");
        equals(true, d.hasKey('key2'), "ensure dictionary has inserted slot");
        equals(false, d.hasKey('key3'), "ensure dictionary doesn't have uninserted slot");
        
        d.remove('key1');
        equals(1, d.count());
        equals(undefined, d.get('key1'));
        equals('value2', d.get('key2'));
        equals(undefined, d.get('key3'));
        equals(false, d.hasKey('key1'), "ensure dictionary doesn't have removed slot");
        equals(true, d.hasKey('key2'), "ensure dictionary has inserted slot");
        equals(false, d.hasKey('key3'), "ensure dictionary doesn't have uninserted slot");
        
        d.remove('key2');
        equals(0, d.count());
        equals(undefined, d.get('key1'));
        equals(undefined, d.get('key2'));
        equals(undefined, d.get('key3'));
        equals(false, d.hasKey('key1'), "ensure dictionary doesn't have removed slot");
        equals(false, d.hasKey('key2'), "ensure dictionary doesn't have removed slot");
        equals(false, d.hasKey('key3'), "ensure dictionary doesn't have uninserted slot");
    });
    test('recursive dictionary: put undefined',function(){
        var d = new JRMutableDictionary();
        
        d.put('key1', undefined);
        equals(1, d.count(), 'undefined value still takes a slot');
        
        equals(undefined, d.get('key1'), 'get slot with undefined value');
        
        d.remove('key1');
        equals(0, d.count(), 'can remove slot with undefined value');
    });
});

function JRMutableDictionary() {
    this._storage = {};
    this._count = 0;
}
JRMutableDictionary.prototype.count = function(){
    var key;
    
    if (this._count === undefined) {
        this._count = 0;
        for (key in this._storage) {
            this._count++;
        }
    }
    return this._count;
}
JRMutableDictionary.prototype.get = function(key){
    return this._storage[key];
}
JRMutableDictionary.prototype.put = function(key, value){
    this._count = undefined;
    this._storage[key] = value;
}
JRMutableDictionary.prototype.remove = function(key){
    this._count = undefined;
    delete this._storage[key];
}
JRMutableDictionary.prototype.hasKey = function(key){
    return this._storage.hasOwnProperty(key);
}

// commits

