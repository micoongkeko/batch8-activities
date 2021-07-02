class Confection
    def prepare
      puts "Baking at 350 degrees for 25 minutes."
    end
  end
  
  class Cupake < Confection
    def prepare
      super
      puts "Applying frosting."
    end
  end
  
  cupcake = Cupcake.new
  cupcake.prepare