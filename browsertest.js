// ================================================================================
// ✅ CORRECTED BROWSER CONSOLE TESTS FOR LIT COMPONENTS
// ================================================================================

// 1. CORRECT WAY TO CHECK ALL REGISTERED CUSTOM ELEMENTS
console.log('🔍 All registered custom elements:');
const registeredElements = [];
customElements.forEach((constructor, name) => {
  registeredElements.push({ name, constructor: constructor.name });
});
console.table(registeredElements);

// 2. QUICK TEST: Check specific Deno Genesis components (CORRECTED)
console.log('\n🚀 Deno Genesis component status:');
const dgComponents = ['dg-base', 'dg-card', 'dg-dashboard', 'dg-notifications'];
const componentStatus = dgComponents.map(tag => ({
  Component: tag,
  Registered: !!customElements.get(tag),
  InDOM: document.querySelectorAll(tag).length,
  CanCreate: document.createElement(tag).constructor.name !== 'HTMLUnknownElement'
}));
console.table(componentStatus);

// 3. TEST COMPONENT CREATION (SAFER VERSION)
console.log('\n🧪 Testing component creation:');
dgComponents.forEach(tagName => {
  try {
    const element = document.createElement(tagName);
    const isCustomElement = element.constructor.name !== 'HTMLUnknownElement';
    const isRegistered = !!customElements.get(tagName);
    
    console.log(`${isCustomElement ? '✅' : '❌'} ${tagName}:`, {
      registered: isRegistered,
      canCreate: isCustomElement,
      constructor: element.constructor.name
    });
  } catch (error) {
    console.log(`❌ ${tagName} - Error:`, error.message);
  }
});

// 4. CHECK FOR LIT-SPECIFIC PROPERTIES
console.log('\n🎭 Testing Lit integration:');
const testCard = document.createElement('dg-card');
const litProperties = ['shadowRoot', 'renderRoot', 'updateComplete', 'requestUpdate'];
litProperties.forEach(prop => {
  const hasProperty = prop in testCard;
  console.log(`${hasProperty ? '✅' : '❌'} ${prop}:`, hasProperty);
});

// 5. CHECK UTILITIES (CORRECTED)
console.log('\n🛠️ Checking Deno Genesis utilities:');
const utilities = ['dgNotify', 'dgLocalFirstFetch', 'dgMeasurePerformance'];
const utilityStatus = utilities.map(util => ({
  Utility: util,
  Available: typeof window[util] === 'function',
  Type: typeof window[util]
}));
console.table(utilityStatus);

// 6. COMPREHENSIVE STATUS CHECK
console.log('\n📊 Overall Status:');
const registeredCount = dgComponents.filter(tag => !!customElements.get(tag)).length;
const inDOMCount = dgComponents.reduce((sum, tag) => sum + document.querySelectorAll(tag).length, 0);
const workingCount = dgComponents.filter(tag => document.createElement(tag).constructor.name !== 'HTMLUnknownElement').length;
const utilityCount = utilities.filter(util => typeof window[util] === 'function').length;

console.log(`🎯 Summary:`);
console.log(`   Components Registered: ${registeredCount}/4`);
console.log(`   Components Working: ${workingCount}/4`);
console.log(`   Components in DOM: ${inDOMCount}`);
console.log(`   Utilities Available: ${utilityCount}/3`);

if (registeredCount === 4 && workingCount === 4 && utilityCount === 3) {
  console.log('🎉 ALL SYSTEMS OPERATIONAL!');
} else {
  console.log('⚠️ Issues detected - see details above');
}

// 7. SIMPLE ONE-LINER STATUS (CORRECTED)
console.log('\n🚀 One-liner status check:');
dgComponents.forEach(tag => console.log(`${tag}: ${customElements.get(tag) ? '✅ Registered' : '❌ Not registered'}`));