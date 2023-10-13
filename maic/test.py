from model import Model
from mount import Mount

net = Model(num_input=8, num_output=8)
m = Mount(net)
m.unmount()
m.run()
m.plot()