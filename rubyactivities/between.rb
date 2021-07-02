puts "Enter your number."
x = gets.chomp.to_i
if x > 100 && x < 0 
    puts "Enter a number between 0 and 100"
    elseif x > 0 && x < 50
        puts "The number is between 0 and 50"
    elseif x > 50 && x < 100
        puts "The number is between 50 and 100"
    end