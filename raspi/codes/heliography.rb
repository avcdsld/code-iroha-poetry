class Heliography
  def initialize(size)
    @data = '-' * size
    @time = 0
  end
  
  def expose_to_sunlight
    @time = [@time + 1, @data.size].min
    @data[0, @time] = '+' * @time
  end

  def to_s
    @data
  end
end

heliograph = Heliography.new(3)
heliograph.expose_to_sunlight
heliograph.expose_to_sunlight
puts heliograph
