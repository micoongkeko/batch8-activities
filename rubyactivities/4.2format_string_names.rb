def list(names)
    i = 0
    l = names.length - 1
    result = ""
    # p names.length
    if names.length > 2
        while i < l do
            result << "#{names[i][:name]}, "
            i += 1
        end
        result << "& #{names[l][:name]}"
        p result
    elsif names.length == 2
        result << "#{names[0][:name]} & #{names[1][:name]}"
        p result
    else
        result << "#{names[0][:name]}"
        p result
    end
end 

list ([{name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'}])
list ([{name: 'Bart'}, {name: 'Lisa'}])
list ([{name: 'Bart'}])



