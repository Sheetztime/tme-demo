# The order of packages is significant as there are dependencies between
# the packages. Typically generated namespaces are used by other packages.
PACKAGES = tme-demo-ui tme-demo
PACKAGE_DEPENDENCIES = resource-manager esc tailf-etsi-rel2-nfvo cisco-asa \
	                     l3vpn datacenter
NED_STORE=$(NCS_DIR)/packages/neds

all: cisco-ios cisco-iosxr juniper-junos alu-sr cisco-nx dell-ftos \
	   l3vpn datacenter
	for i in $(PACKAGE_DEPENDENCIES) $(PACKAGES); do \
	    $(MAKE) -C $${i}/src all || exit 1; \
	done
.PHONY: all

cisco-ios:
	cp -r $(NED_STORE)/cisco-ios-cli-3.8 $@
	cp ../initial-data/netsim/ios.xml $@/netsim

cisco-iosxr:
	ln -s $(NED_STORE)/cisco-iosxr-cli-3.5 $@

juniper-junos:
	ln -s $(NED_STORE)/juniper-junos-nc-3.0 $@

alu-sr:
	ln -s $(NED_STORE)/alu-sr-cli-3.4 $@

cisco-nx:
	ln -s $(NED_STORE)/cisco-nx-cli-3.0 $@

dell-ftos:
	ln -s $(NED_STORE)/dell-ftos-cli-3.0 $@

l3vpn:
	ln -s $(NCS_DIR)/examples.ncs/service-provider/mpls-vpn/packages/$@

datacenter:
	ln -s $(NCS_DIR)/examples.ncs/datacenter/datacenter/packages/connectivity $@

clean:
	for i in $(PACKAGES); do \
	    $(MAKE) -C $${i}/src clean || exit 1; \
	done
.PHONY: clean

deep-clean: clean
	for i in $(PACKAGE_DEPENDENCIES); do \
	    $(MAKE) -C $${i}/src clean || exit 0; \
	done
	rm -f l3vpn
	rm -f datacenter
	rm -f alu-sr
	rm -f juniper-junos
	rm -f cisco-iosxr
	rm -f cisco-nx
	rm -f dell-ftos
	rm -rf cisco-ios
.PHONY: clean-deep
