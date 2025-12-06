import { Activity, TrendingUp, Wind, Zap } from 'lucide-react';

export default function AtmosphericDataWidget() {

  // Mock convective parameters (in production, fetch from specialized API)
  const convectiveParams = {
    cape: 1250, // J/kg
    cin: -45, // J/kg
    liftedIndex: -3.2,
    showalterIndex: -1.5,
    helicity: 185, // m²/s²
    bulkShear: 35, // knots
    k_index: 32,
    totalTotals: 52,
   precipitableWater: 1.8, // inches
    lcl: 850, // mb - Lifting Condensation Level
    lfc: 720, // mb - Level of Free Convection
    el: 180, // mb - Equilibrium Level
  };

  const getCAPECategory = (cape: number) => {
    if (cape < 500) return { label: 'Weak', color: 'text-green-600 dark:text-green-400', risk: 'Low' };
    if (cape < 1500) return { label: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400', risk: 'Moderate' };
    if (cape < 2500) return { label: 'Strong', color: 'text-orange-600 dark:text-orange-400', risk: 'High' };
    return { label: 'Extreme', color: 'text-red-600 dark:text-red-400', risk: 'Very High' };
  };

  const getHelicityCategory = (helicity: number) => {
    if (helicity < 100) return { label: 'Weak', color: 'text-green-600 dark:text-green-400' };
    if (helicity < 250) return { label: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400' };
    if (helicity < 400) return { label: 'Strong', color: 'text-orange-600 dark:text-orange-400' };
    return { label: 'Extreme', color: 'text-red-600 dark:text-red-400' };
  };

  const capeInfo = getCAPECategory(convectiveParams.cape);
  const helicityInfo = getHelicityCategory(convectiveParams.helicity);

  const getTornadoRisk = () => {
    if (convectiveParams.cape > 1500 && convectiveParams.helicity > 150 && convectiveParams.cin > -100) {
      return { level: 'Elevated', color: 'text-orange-600 dark:text-orange-400' };
    }
    if (convectiveParams.cape > 2500 && convectiveParams.helicity > 300) {
      return { level: 'High', color: 'text-red-600 dark:text-red-400' };
    }
    if (convectiveParams.cape > 500 && convectiveParams.helicity > 100) {
      return { level: 'Slight', color: 'text-yellow-600 dark:text-yellow-400' };
    }
    return { level: 'Low', color: 'text-green-600 dark:text-green-400' };
  };

  const tornadoRisk = getTornadoRisk();

  return (
    <div className="space-y-6">
      {/* Convective Parameters Overview */}
      <div className="weather-card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Activity className="w-6 h-6 text-purple-500" />
          <span>Convective Parameters</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* CAPE */}
          <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span className="font-semibold text-gray-900 dark:text-white">CAPE</span>
              </div>
              <span className={`text-xs font-bold ${capeInfo.color}`}>{capeInfo.label}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {convectiveParams.cape}
              <span className="text-lg text-gray-600 dark:text-gray-400 ml-1">J/kg</span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Convective Available Potential Energy
            </div>
            <div className="mt-2 text-xs text-orange-700 dark:text-orange-300">
              Storm Potential: {capeInfo.risk}
            </div>
          </div>

          {/* CIN */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-gray-900 dark:text-white">CIN</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {convectiveParams.cin}
              <span className="text-lg text-gray-600 dark:text-gray-400 ml-1">J/kg</span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Convective Inhibition
            </div>
            <div className="mt-2 text-xs text-blue-700 dark:text-blue-300">
              {Math.abs(convectiveParams.cin) < 50 ? 'Weak cap' : 'Strong cap present'}
            </div>
          </div>

          {/* Helicity */}
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Wind className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="font-semibold text-gray-900 dark:text-white">Helicity</span>
              </div>
              <span className={`text-xs font-bold ${helicityInfo.color}`}>{helicityInfo.label}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {convectiveParams.helicity}
              <span className="text-lg text-gray-600 dark:text-gray-400 ml-1">m²/s²</span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              0-3km Storm Relative Helicity
            </div>
            <div className="mt-2 text-xs text-purple-700 dark:text-purple-300">
              Rotation Potential: {helicityInfo.label}
            </div>
          </div>
        </div>
      </div>

      {/* Severe Weather Indices */}
      <div className="weather-card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Severe Weather Indices
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Lifted Index */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Lifted Index</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {convectiveParams.liftedIndex}
            </div>
            <div className="text-xs mt-1 text-gray-500 dark:text-gray-500">
              {convectiveParams.liftedIndex < -6 ? 'Severe' :
               convectiveParams.liftedIndex < -3 ? 'Strong' :
               convectiveParams.liftedIndex < 0 ? 'Moderate' : 'Stable'}
            </div>
          </div>

          {/* Bulk Shear */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Bulk Shear</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {convectiveParams.bulkShear}
              <span className="text-sm ml-1">kt</span>
            </div>
            <div className="text-xs mt-1 text-gray-500 dark:text-gray-500">
              {convectiveParams.bulkShear > 40 ? 'Strong' :
               convectiveParams.bulkShear > 25 ? 'Moderate' : 'Weak'}
            </div>
          </div>

          {/* K-Index */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">K-Index</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {convectiveParams.k_index}
            </div>
            <div className="text-xs mt-1 text-gray-500 dark:text-gray-500">
              {convectiveParams.k_index > 40 ? 'High' :
               convectiveParams.k_index > 30 ? 'Moderate' : 'Low'}
            </div>
          </div>

          {/* Total Totals */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Totals</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {convectiveParams.totalTotals}
            </div>
            <div className="text-xs mt-1 text-gray-500 dark:text-gray-500">
              {convectiveParams.totalTotals > 55 ? 'Severe' :
               convectiveParams.totalTotals > 50 ? 'Strong' : 'Moderate'}
            </div>
          </div>
        </div>
      </div>

      {/* Tornado Risk Assessment */}
      <div className={`weather-card border-2 ${
        tornadoRisk.level === 'High' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
        tornadoRisk.level === 'Elevated' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
        tornadoRisk.level === 'Slight' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
        'border-green-500 bg-green-50 dark:bg-green-900/20'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Zap className="w-6 h-6" />
            <span>Tornado Risk Assessment</span>
          </h3>
          <span className={`text-2xl font-bold ${tornadoRisk.color}`}>
            {tornadoRisk.level}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Energy
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              CAPE: {convectiveParams.cape} J/kg ({capeInfo.label})
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              CIN: {convectiveParams.cin} J/kg
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Rotation
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Helicity: {convectiveParams.helicity} m²/s²
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Shear: {convectiveParams.bulkShear} kt
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Moisture
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              PW: {convectiveParams.precipitableWater} in
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              LCL: {convectiveParams.lcl} mb
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Levels Info */}
      <div className="weather-card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Activity className="w-6 h-6 text-blue-500" />
          <span>Atmospheric Levels</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">LCL</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{convectiveParams.lcl}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">mb</div>
            <div className="text-xs text-blue-700 dark:text-blue-300 mt-2">Lifting Condensation Level</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">LFC</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{convectiveParams.lfc}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">mb</div>
            <div className="text-xs text-green-700 dark:text-green-300 mt-2">Level of Free Convection</div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">EL</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{convectiveParams.el}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">mb</div>
            <div className="text-xs text-purple-700 dark:text-purple-300 mt-2">Equilibrium Level</div>
          </div>
          <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">PW</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{convectiveParams.precipitableWater}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">inches</div>
            <div className="text-xs text-cyan-700 dark:text-cyan-300 mt-2">Precipitable Water</div>
          </div>
        </div>
      </div>

      {/* Parameter Explanations */}
      <div className="weather-card bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
          Understanding Convective Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-300">
          <div>
            <p className="font-semibold mb-1">CAPE (Convective Available Potential Energy)</p>
            <p className="text-xs">Measures atmospheric instability. Higher values indicate greater potential for strong updrafts.</p>
          </div>
          <div>
            <p className="font-semibold mb-1">CIN (Convective Inhibition)</p>
            <p className="text-xs">Energy needed to initiate convection. Negative values represent a "cap" that prevents storms unless broken.</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Helicity</p>
            <p className="text-xs">Measures rotating potential of storms. High values with strong CAPE suggest tornado risk.</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Lifted Index</p>
            <p className="text-xs">Compares parcel temperature to environment. Negative values indicate instability.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
