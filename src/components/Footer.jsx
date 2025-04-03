import React from 'react'

function Footer() {
  return (
    

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span>📞 +1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <span>📧 help@petMitra.com</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400">Facebook</a>
                <a href="#" className="hover:text-blue-400">Twitter</a>
                <a href="#" className="hover:text-blue-400">Instagram</a>
              </div>
            </div>

            {/* Call to Action */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Make a Difference</h3>
              <p>
                Every small act of kindness towards animals counts. Join us in
                making the world a better place for our furry friends.
              </p>
            </div>
          </div>
        </div>
      </footer>
      
   
  )
}

export default Footer
