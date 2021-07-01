# INHERITANCE POLYMORPHISM EXAMPLE
class Order
    def drink
        puts "Customer is given a drink"
    end
end

class Adult_Order < Order
    def drink
        puts "Adult customer is given a martini."
    end
end

class Minor_Order < Order 
    def drink
        puts "Minor customer is given orange juice."
    end
end

puts "---------INHERITANCE EXAMPLE"
puts "The following is an order of a normal customer."
order = Order.new
order.drink
puts "\n"

puts "The following is an order of an adult customer."
order = Adult_Order.new
order.drink
puts "\n"

puts "The following is an order of a minor customer."
order = Minor_Order.new
order.drink

puts "\n"

# DUCK TYPING POLYMORPHISM EXAMPLE
class Entry
    def order
        puts "A customer ordered"
    end
    
    def age(customer)
      customer.age
    end
    
    def drink(customer)
      customer.drink
    end
    
  end
  
  class Adult
    def age
      puts "The customer is old enough to drink alcohol."
    end
    
    def drink
      puts "Customer has received a martini."
    end
    
  end
  
  class Minor
    def age
      puts "The customer is not to be served alcohol."
    end
    
    def drink
      puts "Customer has been served some orange juice."
    end
    
  end
  
  puts "---------DUCK TYPING EXAMPLE"
  entry = Entry.new
  puts "The following reflects an order of an adult:"
  customer = Adult.new
  entry.age(customer)
  entry.drink(customer)
  
  puts "\n"
  
  puts "The following reflects an order of a minor:"
  customer = Minor.new
  entry.age(customer)
  entry.drink(customer)