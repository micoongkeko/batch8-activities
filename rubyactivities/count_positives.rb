arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]
positive = 0
negative = 0

arr.each do |num|
    if num > 0
        positive += num
    elsif num < 0
        negative += num
    end
end

if arr == []
    puts "[]"
else 
    puts "[#{positive}, #{negative}]"
end