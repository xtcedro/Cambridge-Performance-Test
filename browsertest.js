// ================================================================================
// 🧪 BROWSER CONSOLE TESTS FOR DENO GENESIS LIT COMPONENTS
// ================================================================================
// Copy and paste these commands one by one into your browser console

// 1. CHECK ALL REGISTERED CUSTOM ELEMENTS
console.log('🔍 All registered custom elements:');
Array.from(customElements.entries()).forEach(([name, constructor]) => {
  console.log(`✅ ${name} → ${constructor.name}`);
});

// 2. CHECK SPECIFICALLY FOR DENO GENESIS COMPONENTS
console.log('\n🚀 Deno Genesis components:');
const dgComponents = ['dg-base', 'dg-card', 'dg-dashboard', 'dg-notifications'];
dgComponents.forEach(tagName => {
  const isRegistered = customElements.get(tagName);
  if (isRegistered) {
    console.log(`✅ ${tagName} - REGISTERED`);
  } else {
    console.log(`❌ ${tagName} - NOT REGISTERED`);
  }
});

// 3. TEST COMPONENT CREATION PROGRAMMATICALLY
console.log('\n🧪 Testing component creation:');
dgComponents.forEach(tagName => {
  try {
    const element = document.createElement(tagName);
    if (element instanceof HTMLElement) {
      console.log(`✅ ${tagName} - Can create element`);
      
      // Test if it's actually a custom element (not just HTMLUnknownElement)
      if (element.constructor.name !== 'HTMLUnknownElement') {
        console.log(`   ↳ Constructor: ${element.constructor.name}`);
      } else {
        console.log(`   ⚠️  Created as HTMLUnknownElement (not properly registered)`);
      }
    }
  } catch (error) {
    console.log(`❌ ${tagName} - Creation failed: ${error.message}`);
  }
});

// 4. CHECK FOR EXISTING COMPONENTS IN DOM
console.log('\n📍 Components currently in DOM:');
dgComponents.forEach(tagName => {
  const elements = document.querySelectorAll(tagName);
  if (elements.length > 0) {
    console.log(`✅ ${tagName} - Found ${elements.length} instance(s)`);
    elements.forEach((el, index) => {
      console.log(`   Instance ${index + 1}:`, el);
      console.log(`   Connected: ${el.isConnected}`);
      console.log(`   Shadow Root: ${el.shadowRoot ? 'Yes' : 'No'}`);
    });
  } else {
    console.log(`➖ ${tagName} - Not found in DOM`);
  }
});

// 5. TEST LIT FRAMEWORK AVAILABILITY
console.log('\n🎭 Testing Lit framework:');
try {
  // Check if Lit is available globally
  if (typeof window.lit !== 'undefined') {
    console.log('✅ Lit framework available globally');
  } else {
    console.log('➖ Lit framework not available globally (this is normal)');
  }
  
  // Check if we can import Lit
  import('https://cdn.jsdelivr.net/npm/lit@3.1.0/index.js').then(lit => {
    console.log('✅ Lit can be imported dynamically');
    console.log('   Available exports:', Object.keys(lit));
  }).catch(error => {
    console.log('❌ Lit import failed:', error.message);
  });
} catch (error) {
  console.log('❌ Lit test failed:', error.message);
}

// 6. CHECK DENO GENESIS UTILITIES
console.log('\n🛠️  Testing Deno Genesis utilities:');
const utilities = ['dgNotify', 'dgLocalFirstFetch', 'dgMeasurePerformance'];
utilities.forEach(util => {
  if (typeof window[util] === 'function') {
    console.log(`✅ ${util} - Available`);
  } else {
    console.log(`❌ ${util} - Not available`);
  }
});

// 7. TEST A COMPONENT MANUALLY
console.log('\n🎯 Manual component test:');
try {
  // Try to create and add a test card
  const testCard = document.createElement('dg-card');
  if (testCard.constructor.name !== 'HTMLUnknownElement') {
    testCard.setAttribute('title', 'Test Card');
    testCard.setAttribute('description', 'This is a test from console');
    testCard.setAttribute('icon', '🧪');
    testCard.setAttribute('variant', 'primary');
    
    console.log('✅ Test card created successfully');
    console.log('   Element:', testCard);
    console.log('   Constructor:', testCard.constructor.name);
    
    // Optionally add it to the page temporarily
    console.log('🎯 To add test card to page, run:');
    console.log('document.body.appendChild(testCard);');
    
    // Store reference for manual testing
    window.testCard = testCard;
    
  } else {
    console.log('❌ Test card created as HTMLUnknownElement');
  }
} catch (error) {
  console.log('❌ Manual test failed:', error.message);
}

// 8. CHECK COMPONENT PROPERTIES AND METHODS
console.log('\n🔍 Detailed component inspection:');
const testElement = document.createElement('dg-card');
if (testElement.constructor.name !== 'HTMLUnknownElement') {
  console.log('Properties:', Object.getOwnPropertyNames(testElement));
  console.log('Prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(testElement)));
  
  // Check for Lit-specific properties
  const litProperties = ['shadowRoot', 'renderRoot', 'updateComplete'];
  litProperties.forEach(prop => {
    if (prop in testElement) {
      console.log(`✅ ${prop} - Available`);
    } else {
      console.log(`❌ ${prop} - Missing`);
    }
  });
}